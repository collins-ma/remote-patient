import Link from "next/link"
import { auth } from "@/auth"
import { prisma } from "../lib/prisma"
import VitalsClient from "../components/VitalsClient"
import { redirect } from "next/navigation"
import { Plus } from "lucide-react"

export default async function DashboardPage() {
  const session = await auth()

  if (!session) redirect("/login")
  if (session.user.role !== "PATIENT") redirect("/unauthorized")

  type VitalType = Awaited<
    ReturnType<typeof prisma.vital.findMany>
  >[number]

  const vitalsFromDb: VitalType[] =
    await prisma.vital.findMany({
      where: { patientId: Number(session.user.id) },
      include: { patient: true },
      orderBy: { createdAt: "desc" },
    })

  const serializedVitals = vitalsFromDb.map((v) => ({
    ...v,
    createdAt: v.createdAt.toISOString(),
    healthStatus:
      (
        v as typeof v & {
          patient: {
            healthStatus:
              | "GOOD"
              | "AVERAGE"
              | "CRITICAL"
          }
        }
      ).patient.healthStatus ?? "GOOD",
  }))

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome, {session.user.username} 👋
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Here is your health vitals history.
          </p>
        </div>

        <Link
          href="/patient/vitals"
          className="flex items-center gap-2 px-4 py-2
                     bg-blue-600 hover:bg-blue-700
                     dark:bg-blue-500 dark:hover:bg-blue-600
                     text-white rounded-lg transition"
        >
          <Plus className="w-4 h-4" />
          Add Vital
        </Link>

      </div>

      {/* Vitals List */}
      <VitalsClient vitals={serializedVitals} />

    </div>
  )
}