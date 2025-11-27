import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import { decrypt } from '../../../lib/crypto';
import axios from 'axios';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { canvasApiKey: true },
  });

  if (!user || !user.canvasApiKey) {
    return res.status(400).json({ message: 'Canvas API key not found for user' });
  }

  let decryptedApiKey: string;
  try {
    const encryptedData = JSON.parse(user.canvasApiKey);
    decryptedApiKey = decrypt(encryptedData);
  } catch (error) {
    console.error('Error decrypting Canvas API key:', error);
    return res.status(500).json({ message: 'Failed to decrypt Canvas API key' });
  }

  try {
    // 1. Fetch all active courses
    const coursesResponse = await axios.get(`${process.env.CANVAS_BASE_URL}/api/v1/courses`, {
      headers: {
        Authorization: `Bearer ${decryptedApiKey}`,
      },
      params: {
        enrollment_state: 'active',
        per_page: 100,
      },
    });
    const courses = coursesResponse.data;

    for (const course of courses) {
      // 2. For each course, fetch its assignments
      const assignmentsResponse = await axios.get(`${process.env.CANVAS_BASE_URL}/api/v1/courses/${course.id}/assignments`, {
        headers: {
          Authorization: `Bearer ${decryptedApiKey}`,
        },
        params: {
          bucket: 'upcoming', // Only get upcoming assignments
          per_page: 100,
        },
      });
      const assignments = assignmentsResponse.data;

      for (const assignment of assignments) {
        // Prevent duplicates
        const existingTask = await prisma.task.findFirst({
          where: {
            canvasAssignmentId: String(assignment.id),
            userId: userId,
          },
        });

        if (!existingTask) {
          await prisma.task.create({
            data: {
              userId: userId,
              type: 'CANVAS_ASSIGNMENT',
              canvasAssignmentId: String(assignment.id),
              title: assignment.name,
              description: assignment.description,
              dueDate: assignment.due_at ? new Date(assignment.due_at) : null,
              courseName: course.name,
              canvasHtmlUrl: assignment.html_url,
            },
          });
        }
      }
    }

    res.status(200).json({ message: 'All Canvas courses and assignments synced successfully' });
  } catch (error) {
    console.error('Error syncing all Canvas courses and assignments:', error);
    // @ts-ignore
    res.status(error.response?.status || 500).json({ message: 'Failed to sync all Canvas courses and assignments' });
  }
}
