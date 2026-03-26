
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/app/lib/prisma"
import bcrypt from "bcryptjs"
import NextAuth from "next-auth"


 

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET!,
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const creds = credentials as {
          username: string
          password: string
        }

        // Basic validation
        if (!creds?.username || !creds?.password) {
          return null
        }

        // Find user
        const user = await prisma.user.findUnique({
          where: { username: creds.username },
        })

        if (!user) return null

        // 🔐 Compare hashed password
        const isValidPassword = await bcrypt.compare(
          creds.password,
          user.password
        )

        if (!isValidPassword) return null

        // Return safe user object (never return password)
        return {
          id: user.id.toString(),
          username: user.username,
          email: user.email,
          role: user.role,
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.role = user.role
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.username = token.username as string
        session.user.role = token.role as
          | "ADMIN"
          | "DOCTOR"
          | "PATIENT"
      }

      return session
    },
  },
})