import DoctorPatientTable from "@/app/components/DoctorPatientTable"
import { prisma } from "@/app/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function AdminDoctorPatientPage() {
  try {
    const session = await auth()
    if (!session) redirect("/login")
    if (session.user.role !== "ADMIN") redirect("/login")

    const assignments = await prisma.patient.findMany({
      include: {
        user: true, // patient info
        doctor: { include: { user: true } }, // doctor info
      },
    })

    console.log("Fetched assignments:", assignments)

    const data = assignments.map((p) => ({
      patientName: p.user.username,
      doctorName: p.doctor?.user.username ?? "Unassigned",
    }))

    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Doctor-Patient Assignments</h1>
        <DoctorPatientTable data={data} />
      </div>
    )
  } catch (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Doctor-Patient Assignments</h1>
        <DoctorPatientTable data={[]} fetchError="Failed to load assignments" />
      </div>
    )
  }
}