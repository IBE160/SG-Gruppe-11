import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

  switch (req.method) {
    case 'PUT':
      const { title, dueDate, isCompleted, priority } = req.body;
      const updatedTask = await prisma.task.update({
        where: { id: String(id) },
        data: {
          title,
          dueDate,
          isCompleted,
          priority,
        },
      });
      res.status(200).json(updatedTask);
      break;
    case 'DELETE':
      await prisma.task.delete({
        where: { id: String(id) },
      });
      res.status(204).end();
      break;
    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
