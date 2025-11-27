import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import { google } from 'googleapis';
import { decrypt } from '../../../lib/crypto';
import axios from 'axios';

const prisma = new PrismaClient();

// Helper function to get start and end of a day
const getDayBounds = (date: Date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  return { startOfDay, endOfDay };
};

// Helper to convert preferred times (e.g., "09:00") to Date objects for a given day
const getTimeAsDate = (date: Date, time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  const newDate = new Date(date);
  newDate.setHours(hours, minutes, 0, 0);
  return newDate;
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;
  const { taskId, timeframeDays } = req.query; // taskId to get estimated duration, timeframe in days

  if (!taskId || !timeframeDays) {
    return res.status(400).json({ message: 'taskId and timeframeDays are required' });
  }

  const estimatedTaskDuration = (await prisma.task.findUnique({
    where: { id: String(taskId) },
    select: { estimatedTime: true },
  }))?.estimatedTime || 60; // Default to 60 minutes if not set

  const timeframeEnd = new Date();
  timeframeEnd.setDate(timeframeEnd.getDate() + Number(timeframeDays));

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      googleCalendarAccessToken: true,
      googleCalendarRefreshToken: true,
      selectedCalendarIds: true,
      preferredStudyTimes: true,
    },
  });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // --- Fetch existing commitments (Tasks) ---
  const existingTasks = await prisma.task.findMany({
    where: {
      userId,
      isCompleted: false,
      dueDate: {
        lte: timeframeEnd,
      },
    },
  });

  const commitmentBlocks: { start: Date; end: Date; type: string }[] = existingTasks.map(task => ({
    start: task.dueDate || new Date(), // Use dueDate as a commitment for simplicity, or add actual scheduled start/end
    end: task.dueDate ? new Date(task.dueDate.getTime() + (task.estimatedTime || 60) * 60 * 1000) : new Date(), // Assuming estimated time is a commitment
    type: 'Task',
  }));

  // --- Fetch existing commitments (Calendar Events) ---
  let googleCalendarEvents: any[] = [];
  if (user.googleCalendarAccessToken && user.googleCalendarRefreshToken && user.selectedCalendarIds) {
    let decryptedAccessToken: string;
    let decryptedRefreshToken: string;
    let selectedCalendarIds: string[];

    try {
      const encryptedAccessToken = JSON.parse(user.googleCalendarAccessToken);
      decryptedAccessToken = decrypt(encryptedAccessToken);
      const encryptedRefreshToken = JSON.parse(user.googleCalendarRefreshToken);
      decryptedRefreshToken = decrypt(encryptedRefreshToken);
      selectedCalendarIds = (user.selectedCalendarIds as any as string[]) || [];
    } catch (error) {
      console.error('Error decrypting Google Calendar tokens or parsing selectedCalendarIds:', error);
      return res.status(500).json({ message: 'Failed to retrieve Google Calendar data' });
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CALENDAR_CLIENT_ID,
      process.env.GOOGLE_CALENDAR_CLIENT_SECRET,
      process.env.NEXTAUTH_URL + '/api/auth/google-calendar-oauth'
    );

    oauth2Client.setCredentials({
      access_token: decryptedAccessToken,
      refresh_token: decryptedRefreshToken,
    });

    // Handle token refresh if needed (already implemented in calendar/list and calendar/events)

    try {
      const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
      for (const calendarId of selectedCalendarIds) {
        const response = await calendar.events.list({
          calendarId: calendarId,
          timeMin: new Date().toISOString(),
          timeMax: timeframeEnd.toISOString(),
          singleEvents: true,
          orderBy: 'startTime',
        });
        if (response.data.items) {
          googleCalendarEvents.push(...response.data.items.map(event => ({
            start: new Date(event.start?.dateTime || event.start?.date),
            end: new Date(event.end?.dateTime || event.end?.date),
            type: 'Google Calendar Event',
          })));
        }
      }
    } catch (error) {
      console.error('Error fetching Google Calendar events for free time algorithm:', error);
      // @ts-ignore
      // continue even if calendar events fetch fails
    }
  }

  // Combine all commitment blocks and sort them
  commitmentBlocks.push(...googleCalendarEvents);
  commitmentBlocks.sort((a, b) => a.start.getTime() - b.start.getTime());

  // --- "Find Free Time" Algorithm ---
  const suggestedFreeTimes: { start: Date; end: Date }[] = [];
  const now = new Date();

  // Iterate through each day in the timeframe
  for (let i = 0; i < Number(timeframeDays); i++) {
    const currentDay = new Date(now);
    currentDay.setDate(now.getDate() + i);

    const dayOfWeek = currentDay.toLocaleDateString('en-US', { weekday: 'long' });
    const preferredStudyTimes = user.preferredStudyTimes as { days: string[]; startTime: string; endTime: string; } | null;

    if (preferredStudyTimes && preferredStudyTimes.days.includes(dayOfWeek)) {
      const preferredStart = getTimeAsDate(currentDay, preferredStudyTimes.startTime);
      const preferredEnd = getTimeAsDate(currentDay, preferredStudyTimes.endTime);

      let currentFreeBlockStart = preferredStart;

      // Filter commitments for the current day
      const dayCommitments = commitmentBlocks.filter(block =>
        block.start.toDateString() === currentDay.toDateString() ||
        block.end.toDateString() === currentDay.toDateString()
      );

      for (const commitment of dayCommitments) {
        // If commitment starts after our current free block ends, there's a free slot
        if (currentFreeBlockStart.getTime() + estimatedTaskDuration * 60 * 1000 <= commitment.start.getTime()) {
          const potentialFreeTimeEnd = new Date(currentFreeBlockStart.getTime() + estimatedTaskDuration * 60 * 1000);
          if (potentialFreeTimeEnd <= commitment.start) { // Ensure it fits entirely before commitment
            suggestedFreeTimes.push({ start: currentFreeBlockStart, end: potentialFreeTimeEnd });
          }
        }
        // Move our current free block start past the current commitment
        if (commitment.end > currentFreeBlockStart) {
          currentFreeBlockStart = commitment.end;
        }
      }

      // After checking all commitments, check if there's a remaining free block until preferred end
      if (currentFreeBlockStart < preferredEnd) {
        const potentialFreeTimeEnd = new Date(currentFreeBlockStart.getTime() + estimatedTaskDuration * 60 * 1000);
        if (potentialFreeTimeEnd <= preferredEnd) {
          suggestedFreeTimes.push({ start: currentFreeBlockStart, end: potentialFreeTimeEnd });
        }
      }
    }
  }

  res.status(200).json(suggestedFreeTimes.slice(0, 5)); // Return top 5 suggestions
}
