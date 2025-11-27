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
  const { elapsedTime } = req.body; // Elapsed time in minutes

  if (typeof elapsedTime !== 'number' || elapsedTime < 0) {
    return res.status(400).json({ message: 'Invalid elapsed time' });
  }

  const task = await prisma.task.findUnique({
    where: { id: String(id) },
  });

  if (!task || task.userId !== userId) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const updatedTask = await prisma.task.update({
    where: { id: String(id) },
    data: {
      timeSpent: task.timeSpent + Math.round(elapsedTime), // Add elapsed time to existing timeSpent
    },
  });

  res.status(200).json(updatedTask);
}
