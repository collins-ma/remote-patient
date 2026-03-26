import { prisma } from "@/app/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

import VitalsChart from "../components/VitalsChart"

import DoctorVitalsTable from "../components/DoctorsVitalTable"
export default async function DoctorVitalsDashboard() {
  const session = await auth()

  if (!session) redirect("/login")
  if (session.user.role !== "DOCTOR") redirect("/unauthorized")

  // Fetch patients with last 10 vitals
  const patients = await prisma.patient.findMany({
    where: { doctorId: Number(session.user.id) },
    include: {
      user: true,
      vitals: { orderBy: { createdAt: "asc" }, take: 10 },
    },
  })

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Welcome back, Dr. {session.user.username} 👋</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Monitor your patients’ blood pressure trends and latest readings
        </p>
      </div>

      {/* Patients Cards */}
      {patients.map((patient) => (
        <div
          key={patient.id}
          className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl shadow space-y-4"
        >
          {/* Patient header */}
          <h2 className="text-lg font-semibold">{patient.user.username}</h2>

          {/* Responsive grid: chart + table */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Chart */}
            <VitalsChart data={patient.vitals} />

            {/* Table */}
            <DoctorVitalsTable patients={[patient]} />
          </div>
        </div>
      ))}
    </div>
  )
}