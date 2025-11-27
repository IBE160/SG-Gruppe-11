import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).end();
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;
  const { preferredStudyTimes } = req.body;

  if (!preferredStudyTimes) {
    return res.status(400).json({ message: 'Preferred study times are required' });
  }

  await prisma.user.update({
    where: { id: userId },
    data: { preferredStudyTimes },
  });

  res.status(200).json({ message: 'Preferred study times saved successfully' });
}
