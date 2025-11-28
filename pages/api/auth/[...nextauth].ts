import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      const dbUser = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
        select: {
          selectedCalendarIds: true,
        },
      });
      session.user.id = user.id;
      if (dbUser) {
        session.user.selectedCalendarIds = (dbUser.selectedCalendarIds as string[]) || [];
      }
      return session;
    },
  },
})
