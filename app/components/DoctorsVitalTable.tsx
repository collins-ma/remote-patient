"use client"

import Link from "next/link"
import { useState, useMemo } from "react"
import { CheckCircle, AlertCircle, XCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

// TYPES

type Vital = {
  id: number
  highPressure: number
  lowPressure: number
  createdAt: Date
}

type PatientWithVitals = {
  id: number
  user: { username: string; email: string }
  vitals: Vital[]
  healthStatus: "GOOD" | "AVERAGE" | "CRITICAL"
}

interface Props {
  patients: PatientWithVitals[]
}

// HELPERS

function getLatestVital(vitals: Vital[]) {
  return vitals
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
}

function getBPLabel(high?: number, low?: number) {
  if (!high || !low) return "N/A"
  if (high < 120 && low < 80) return "Normal"
  if (high < 130 && low < 80) return "Elevated"
  if (high < 140 || low < 90) return "Stage 1"
  return "High Risk"
}

function getTrend(vitals: Vital[]) {
  if (vitals.length < 2) return null

  const sorted = vitals
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return sorted[0].highPressure > sorted[1].highPressure ? "up" : "down"
}

export default function DoctorVitalsTable({ patients }: Props) {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("ALL")

  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      const matchSearch =
        p.user.username.toLowerCase().includes(search.toLowerCase()) ||
        p.user.email.toLowerCase().includes(search.toLowerCase())

      const matchFilter = filter === "ALL" || p.healthStatus === filter

      return matchSearch && matchFilter
    })
  }, [patients, search, filter])

  if (patients.length === 0)
    return <p className="text-gray-600 dark:text-gray-400">No patients assigned yet.</p>

  return (
    <div className="space-y-4">
      {/* SEARCH & FILTER */}
      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by username or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded border dark:bg-gray-800"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 rounded border dark:bg-gray-800"
        >
          <option value="ALL">All</option>
          <option value="GOOD">Good</option>
          <option value="AVERAGE">Average</option>
          <option value="CRITICAL">Critical</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm bg-gray-50 dark:bg-gray-800 rounded-xl shadow">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-900">
              <th className="p-3">Username</th>
              <th className="p-3">Email</th>
              <th className="p-3">High</th>
              <th className="p-3">Low</th>
              <th className="p-3">BP Level</th>
              <th className="p-3">Trend</th>
              <th className="p-3">Last Update</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredPatients.map((patient) => {
              const latestVital = getLatestVital(patient.vitals)
              const trend = getTrend(patient.vitals)

              const statusConfig = {
                GOOD: {
                  icon: <CheckCircle className="w-5 h-5 text-green-500" />,
                  color: "text-green-500",
                },
                AVERAGE: {
                  icon: <AlertCircle className="w-5 h-5 text-yellow-500" />,
                  color: "text-yellow-500",
                },
                CRITICAL: {
                  icon: <XCircle className="w-5 h-5 text-red-500" />,
                  color: "text-red-500",
                },
              }

              const config = statusConfig[patient.healthStatus] ?? statusConfig.AVERAGE

              return (
                <tr
                  key={patient.id}
                  className={`hover:bg-gray-100 dark:hover:bg-gray-700 
                  ${patient.healthStatus === "CRITICAL" ? "bg-red-100 dark:bg-red-900/20" : ""}`}
                >
                  <td className="p-3">{patient.user.username}</td>
                  <td className="p-3">{patient.user.email}</td>
                  <td className="p-3">{latestVital?.highPressure ?? "-"}</td>
                  <td className="p-3">{latestVital?.lowPressure ?? "-"}</td>

                  <td className="p-3 font-medium">
                    {getBPLabel(latestVital?.highPressure, latestVital?.lowPressure)}
                  </td>

                  <td className="p-3">
                    {trend === "up" && "↑"}
                    {trend === "down" && "↓"}
                  </td>

                  <td className="p-3">
                    {latestVital
                      ? formatDistanceToNow(new Date(latestVital.createdAt), { addSuffix: true })
                      : "-"}
                  </td>

                  <td className={`p-3 font-semibold ${config.color}`}>
                    <div className="flex items-center gap-1">
                      {config.icon}
                      {patient.healthStatus}
                    </div>
                  </td>

                  <td className="p-3">
                    <Link
                      href={`/doctor/patients/${patient.id}`}
                      className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
