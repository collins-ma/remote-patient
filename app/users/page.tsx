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

  // Redirect if not logged in
  if (!session||session?.user.role!=="ADMIN") redirect("/login")


  try {
    users = await prisma.user.findMany({
     select:{
      id: true,
        email: true,
       username: true,
        role: true,
        createdAt: true,
      } ,
      orderBy: { createdAt: "desc" },
    })
  } catch (err) {
    console.error("Failed to fetch users:", err)
    fetchError = "Failed to fetch users. Please try again later."
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Users</h1>

      {/* Pass users and error to Client Component */}
      <UsersTableClient initialUsers={users} fetchError={fetchError} />
    </div>
  )
}