import NextAuth, {DefaultSession} from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    username: string
    role: "ADMIN" | "DOCTOR" | "PATIENT"
  }

  interface Session {
    user: {
      id: string
      username: string
      role: "ADMIN" | "DOCTOR" | "PATIENT"
    }&DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    username: string
    role: "ADMIN" | "DOCTOR" | "PATIENT"
  }
}