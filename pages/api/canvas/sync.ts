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
  const { courseId } = req.body;

  if (!courseId) {
    return res.status(400).json({ message: 'Course ID is required' });
  }

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
    const assignmentsResponse = await axios.get(`${process.env.CANVAS_BASE_URL}/api/v1/courses/${courseId}/assignments`, {
      headers: {
        Authorization: `Bearer ${decryptedApiKey}`,
      },
      params: {
        bucket: 'future', // Only get future assignments
        per_page: 100,
      },
    });

    const assignments = assignmentsResponse.data;

    const courseResponse = await axios.get(`${process.env.CANVAS_BASE_URL}/api/v1/courses/${courseId}`, {
      headers: {
        Authorization: `Bearer ${decryptedApiKey}`,
      },
      params: {
        // include: ['term'], // To get term information if needed
      },
    });

    const course = courseResponse.data;
    const courseName = course.name;

    for (const assignment of assignments) {
      // Check if assignment already exists as a task to prevent duplicates
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
            courseName: courseName,
            canvasHtmlUrl: assignment.html_url,
          },
        });
      }
    }

    res.status(200).json({ message: 'Canvas assignments synced successfully' });
  } catch (error) {
    console.error('Error syncing Canvas assignments:', error);
    // @ts-ignore
    res.status(error.response?.status || 500).json({ message: 'Failed to sync Canvas assignments' });
  }
}
