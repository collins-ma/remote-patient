import { redirect } from "next/navigation"
import CreateUserForm from "@/app/components/CreateUserForm"
import { auth } from "@/auth"

export default async function NewUserPage() {
  const session = await auth()

  // Redirect non-admins
  if (!session || session.user.role !== "ADMIN") {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-2xl p-8">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-8">
          Create New User
        </h1>

        {/* Form */}
        <CreateUserForm />
      </div>
    </div>
  )
}