import { redirect } from "next/navigation"
import CreateUserForm from "@/app/components/CreateUserForm"
import { auth } from "@/auth"

export default async function NewUserPage() {
  // Get server-side session
  const session = await auth()

  // Redirect non-admins
  if (!session || session.user.role !== "ADMIN") {
    redirect("/login") // Or "/login"
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Create New User</h1>
      <CreateUserForm />
    </div>
  )
}