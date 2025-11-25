import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import { encrypt } from '../../../lib/crypto';

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
  const { canvasApiKey } = req.body;

  if (!canvasApiKey) {
    return res.status(400).json({ message: 'Canvas API key is required' });
  }

  const encryptedApiKey = encrypt(canvasApiKey);

  await prisma.user.update({
    where: { id: userId },
    data: { canvasApiKey: JSON.stringify(encryptedApiKey) },
  });

  // Here you would ideally test the connection to Canvas API
  // For now, we just confirm that the key is saved.

  res.status(200).json({ message: 'Canvas API key saved successfully' });
}
