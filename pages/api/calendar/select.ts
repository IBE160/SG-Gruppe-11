import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import { encrypt } from '../../../lib/crypto'; // Assuming you still encrypt JSON data

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
  const { selectedCalendarIds } = req.body; // Expecting an array of strings

  if (!Array.isArray(selectedCalendarIds)) {
    return res.status(400).json({ message: 'selectedCalendarIds must be an array' });
  }

  // Store the selected calendar IDs directly as JSON, no need to encrypt individual IDs
  await prisma.user.update({
    where: { id: userId },
    data: {
      selectedCalendarIds: selectedCalendarIds,
    },
  });

  res.status(200).json({ message: 'Selected calendars saved successfully' });
}
