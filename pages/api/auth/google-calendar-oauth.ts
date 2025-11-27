import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import { google } from 'googleapis';
import { encrypt } from '../../../lib/crypto';

const prisma = new PrismaClient();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CALENDAR_CLIENT_ID,
  process.env.GOOGLE_CALENDAR_CLIENT_SECRET,
  process.env.NEXTAUTH_URL + '/api/auth/google-calendar-oauth' // This URL should be registered in Google Cloud Console
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;

  if (req.method === 'GET') {
    const { code } = req.query;

    if (!code) {
      // Initiate OAuth flow
      const authorizeUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/calendar.readonly'],
        prompt: 'consent',
      });
      return res.redirect(authorizeUrl);
    } else {
      // Handle OAuth callback
      try {
        const { tokens } = await oauth2Client.getToken(String(code));
        const encryptedAccessToken = encrypt(tokens.access_token);
        const encryptedRefreshToken = tokens.refresh_token ? encrypt(tokens.refresh_token) : null;

        await prisma.user.update({
          where: { id: userId },
          data: {
            googleCalendarAccessToken: JSON.stringify(encryptedAccessToken),
            googleCalendarRefreshToken: encryptedRefreshToken ? JSON.stringify(encryptedRefreshToken) : null,
          },
        });

        res.redirect('/settings?status=google-calendar-success'); // Redirect to settings page with success status
      } catch (error) {
        console.error('Error during Google Calendar OAuth callback:', error);
        res.redirect('/settings?status=google-calendar-error'); // Redirect to settings page with error status
      }
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
