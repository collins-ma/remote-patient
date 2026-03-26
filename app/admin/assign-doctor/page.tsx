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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Assign Doctor to Patient</h1>
      <AssignDoctorForm doctors={doctors} patients={patients} />
    </div>
  )
}