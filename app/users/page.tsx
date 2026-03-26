import { prisma } from "@/app/lib/prisma"
import UsersTableClient from "@/app/components/UsersTableClient"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

type User = {
  id: number
  email: string
  username: string
  role: "PATIENT" | "DOCTOR" | "ADMIN"
  createdAt: Date
}

export default async function UsersPage() {
  let users: User[] = []
  let fetchError: string | null = null

  const session = await auth()

  // Redirect if not logged in or not admin
  if (!session || session.user.role !== "ADMIN") redirect("/login")

  try {
    users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    })
  } catch (err) {
    console.error("Failed to fetch users:", err)
    fetchError = "Failed to fetch users. Please try again later."
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 space-y-6">
      
      {/* Welcome message */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Welcome back, {session.user.username} 👋
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Here is the complete list of users in the system.
        </p>
      </div>

      {/* Page Heading */}
      

      {/* Users Table */}
      <UsersTableClient initialUsers={users} fetchError={fetchError} />
    </div>
  )
}