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

  switch (req.method) {
    case 'GET':
      const { startDate, endDate } = req.query;
      const whereClause: any = { userId };

      if (startDate && endDate) {
        whereClause.dueDate = {
          gte: new Date(String(startDate)),
          lte: new Date(String(endDate)),
        };
      }

      const tasks = await prisma.task.findMany({
        where: whereClause,
        orderBy: {
          dueDate: 'asc',
        },
      });
      res.status(200).json(tasks);
      break;
    case 'POST':
      const { title, dueDate, priority } = req.body;
      const newTask = await prisma.task.create({
        data: {
          title,
          dueDate,
          priority: priority || 'MEDIUM', // Default to MEDIUM if not provided
          userId,
          type: 'PERSONAL',
        },
      });
      res.status(201).json(newTask);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
