import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import { decrypt } from '../../../lib/crypto';
import axios from 'axios';

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
    const response = await axios.get(`${process.env.CANVAS_BASE_URL}/api/v1/courses`, {
      headers: {
        Authorization: `Bearer ${decryptedApiKey}`,
      },
      params: {
        enrollment_state: 'active',
        // include: ['term'], // To get term information if needed
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching Canvas courses:', error);
    // @ts-ignore
    res.status(error.response?.status || 500).json({ message: 'Failed to fetch Canvas courses' });
  }
}
