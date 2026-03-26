"use client"

import Link from "next/link"
import { CheckCircle, AlertCircle, XCircle } from "lucide-react"

type PatientWithVitals = {
  id: number
  user: { username: string; email: string }
  vitals: { id: number; highPressure: number; lowPressure: number; createdAt: Date }[]
  healthStatus: "GOOD" | "AVERAGE" | "CRITICAL"
}

interface Props {
  patients: PatientWithVitals[]
}

export default function DoctorVitalsTable({ patients }: Props) {
  if (patients.length === 0)
    return (
      <p className="text-gray-600 dark:text-gray-400">No patients assigned yet.</p>
    )

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm bg-gray-50 dark:bg-gray-800 rounded-xl shadow transition-colors">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200">
            <th className="p-3 border border-gray-300 dark:border-gray-700">Username</th>
            <th className="p-3 border border-gray-300 dark:border-gray-700">Email</th>
            <th className="p-3 border border-gray-300 dark:border-gray-700">Latest High</th>
            <th className="p-3 border border-gray-300 dark:border-gray-700">Latest Low</th>
            <th className="p-3 border border-gray-300 dark:border-gray-700">Latest Vital Date</th>
            <th className="p-3 border border-gray-300 dark:border-gray-700">Health Status</th>
            <th className="p-3 border border-gray-300 dark:border-gray-700">Actions</th>
          </tr>
        </thead>

        <tbody className="text-gray-700 dark:text-gray-200">
          {patients.map((patient) => {
            const latestVital = patient.vitals[0]

            const statusConfig = {
              GOOD: {
                icon: <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-1" />,
                color: "text-green-600 dark:text-green-400",
              },
              AVERAGE: {
                icon: <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-1" />,
                color: "text-yellow-600 dark:text-yellow-400",
              },
              CRITICAL: {
                icon: <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-1" />,
                color: "text-red-600 dark:text-red-400",
              },
            }

            const config = statusConfig[patient.healthStatus]

            return (
              <tr
                key={patient.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="p-3 border border-gray-300 dark:border-gray-700">
                  {patient.user.username}
                </td>
                <td className="p-3 border border-gray-300 dark:border-gray-700">
                  {patient.user.email}
                </td>
                <td className="p-3 border border-gray-300 dark:border-gray-700">
                  {latestVital?.highPressure ?? "-"}
                </td>
                <td className="p-3 border border-gray-300 dark:border-gray-700">
                  {latestVital?.lowPressure ?? "-"}
                </td>
                <td className="p-3 border border-gray-300 dark:border-gray-700">
                  {latestVital ? new Date(latestVital.createdAt).toLocaleString() : "-"}
                </td>
                <td className={`p-3 border border-gray-300 dark:border-gray-700 font-semibold ${config.color}`}>
                  <div className="flex items-center">
                    {config.icon}
                    {patient.healthStatus.charAt(0) + patient.healthStatus.slice(1).toLowerCase()}
                  </div>
                </td>
                <td className="p-3 border border-gray-300 dark:border-gray-700">
                  <Link
                    href={`/doctor/patients/${patient.id}`}
                    className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white transition-colors"
                  >
                    View Patient
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}