import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import { google } from 'googleapis';
import { decrypt, encrypt } from '../../../lib/crypto';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      googleCalendarAccessToken: true,
      googleCalendarRefreshToken: true,
      selectedCalendarIds: true,
    },
  });

  if (!user || !user.googleCalendarAccessToken || !user.googleCalendarRefreshToken) {
    return res.status(400).json({ message: 'Google Calendar not connected' });
  }

  let decryptedAccessToken: string;
  let decryptedRefreshToken: string;
  let selectedCalendarIds: string[];

  try {
    const encryptedAccessToken = JSON.parse(user.googleCalendarAccessToken);
    decryptedAccessToken = decrypt(encryptedAccessToken);
    const encryptedRefreshToken = JSON.parse(user.googleCalendarRefreshToken);
    decryptedRefreshToken = decrypt(encryptedRefreshToken);
    selectedCalendarIds = (user.selectedCalendarIds as any as string[]) || []; // Cast to string[]
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

  oauth2Client.on('tokens', async (tokens) => {
    if (tokens.access_token) {
      const updatedEncryptedAccessToken = encrypt(tokens.access_token);
      await prisma.user.update({
        where: { id: userId },
        data: { googleCalendarAccessToken: JSON.stringify(updatedEncryptedAccessToken) },
      });
    }
    if (tokens.refresh_token) {
      const updatedEncryptedRefreshToken = encrypt(tokens.refresh_token);
      await prisma.user.update({
        where: { id: userId },
        data: { googleCalendarRefreshToken: JSON.stringify(updatedEncryptedRefreshToken) },
      });
    }
  });

  try {
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const allEvents: any[] = [];
    const { timeMin, timeMax } = req.query; // Get timeMin and timeMax from query

    for (const calendarId of selectedCalendarIds) {
      const response = await calendar.events.list({
        calendarId: calendarId,
        timeMin: (timeMin as string) || (new Date()).toISOString(), // Use query param or default to now
        timeMax: timeMax as string, // Use query param
        maxResults: 100,
        singleEvents: true,
        orderBy: 'startTime',
      });
      if (response.data.items) {
        allEvents.push(...response.data.items.map(event => ({
          id: event.id,
          title: event.summary,
          start: event.start?.dateTime || event.start?.date,
          end: event.end?.dateTime || event.end?.date,
          htmlLink: event.htmlLink,
          calendarId: calendarId,
          type: 'GOOGLE_CALENDAR_EVENT',
        })));
      }
    }
    res.status(200).json(allEvents);
  } catch (error) {
    console.error('Error fetching Google Calendar events:', error);
    // @ts-ignore
    res.status(error.response?.status || 500).json({ message: 'Failed to fetch Google Calendar events' });
  }
}
