"use client"

import { useState, useMemo, useEffect } from "react"
import { toast } from "sonner"

type Assignment = {
  patientName: string
  doctorName: string
}

type Props = {
  data: Assignment[]
  fetchError?: string | null
}

export default function DoctorPatientTable({ data, fetchError }: Props) {
  const [search, setSearch] = useState("")

  // Show toast once if error exists
  useEffect(() => {
    if (fetchError) toast.error(fetchError)
  }, [fetchError])

  const filteredData = useMemo(() => {
    if (!search) return data
    return data.filter(
      (a) =>
        a.patientName.toLowerCase().includes(search.toLowerCase()) ||
        a.doctorName.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, data])

  return (
    <div
      className="overflow-x-auto
                 bg-white dark:bg-gray-900
                 border border-gray-200 dark:border-gray-700
                 rounded-xl shadow-lg
                 p-6 transition-colors"
    >
      {/* Error Message */}
      {fetchError && (
        <p className="text-red-600 dark:text-red-400 mb-4 text-center font-semibold">
          {fetchError}
        </p>
      )}

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by patient or doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={!!fetchError}
          className="w-full px-4 py-3 rounded-lg
                     border border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-800
                     text-gray-800 dark:text-gray-200
                     placeholder-gray-400 dark:placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     transition"
        />
      </div>

      {/* Table */}
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-blue-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 uppercase tracking-wider">
            <th className="px-6 py-3 text-left">Patient</th>
            <th className="px-6 py-3 text-left">Doctor</th>
          </tr>
        </thead>

        <tbody
          className="divide-y divide-gray-200 dark:divide-gray-700
                     text-gray-800 dark:text-gray-200"
        >
          {filteredData.length === 0 ? (
            <tr>
              <td
                colSpan={2}
                className="text-center py-8 text-gray-400 dark:text-gray-500 italic"
              >
                {fetchError
                  ? "Cannot load assignments"
                  : "No assignments found"}
              </td>
            </tr>
          ) : (
            filteredData.map((a, index) => (
              <tr
                key={index}
                className={`transition-colors duration-200
                  ${
                    index % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-800"
                      : "bg-white dark:bg-gray-900"
                  }
                  hover:bg-blue-100 dark:hover:bg-gray-700`}
              >
                <td className="px-6 py-4 font-medium">
                  {a.patientName}
                </td>

                <td className="px-6 py-4">
                  {a.doctorName}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}