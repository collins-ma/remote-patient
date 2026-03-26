import { prisma } from "@/app/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import PatientVitalsCard from "@/app/components/PatientVitalsCard"

export default async function PatientPage({
  params,
}: {
  params: Promise<{ patientId: string }>
}) {

  const { patientId } = await params

  const session = await auth()
  if (!session) redirect("/login")
  if (session.user.role !== "DOCTOR") redirect("/unauthorized")

  const patient = await prisma.patient.findUnique({
    where: { id: Number(patientId) },
    include: { user: true, vitals: { orderBy: { createdAt: "desc" } } },
  })

  if (!patient) return <div>Patient not found</div>

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <PatientVitalsCard patient={patient} />
    </div>
  )
}