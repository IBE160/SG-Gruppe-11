import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

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
  const { id } = req.query;

  const task = await prisma.task.findUnique({
    where: { id: String(id) },
  });

  if (!task || task.userId !== userId) {
    return res.status(404).json({ message: 'Task not found' });
  }

  // Store the timer start time in a temporary field or a separate model if more complex tracking is needed.
  // For simplicity, we'll assume the frontend will send the elapsed time on stop.
  // If we wanted to store start time, we'd add a field like `timerStartedAt: DateTime?` to the Task model.

  res.status(200).json({ message: 'Timer started (frontend responsibility for now)' });
}
