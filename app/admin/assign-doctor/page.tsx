import { prisma } from "@/app/lib/prisma"
import AssignDoctorForm from "@/app/components/AssignDoctorForm"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function AssignDoctorPage() {
  const session = await auth()

  if (!session) redirect("/login")
  if (session.user.role !== "ADMIN") redirect("/unauthorized")

  // Fetch doctors & patients for dropdown
  const doctors = await prisma.user.findMany({
    where: { role: "DOCTOR" },
    select: { id: true, username: true },
  })

  const patients = await prisma.user.findMany({
    where: { role: "PATIENT" },
    select: { id: true, username: true },
  })

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-8">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-8">
          Assign Doctor to Patient
        </h1>

        {/* Form */}
        <AssignDoctorForm doctors={doctors} patients={patients} />
      </div>
    </div>
  )
}