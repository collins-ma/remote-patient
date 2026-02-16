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

  // Show toast if there’s a fetch error (once on mount)
  useEffect(() => {
    if (fetchError) toast.error(fetchError)
  }, [fetchError])

  // Filter assignments based on search
  const filteredData = useMemo(() => {
    if (!search) return data
    return data.filter(
      (a) =>
        a.patientName.toLowerCase().includes(search.toLowerCase()) ||
        a.doctorName.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, data])

  return (
    <div className="overflow-x-auto border rounded-md shadow bg-gray-50 p-4">
      {/* Optional table-level error */}
      {fetchError && (
        <p className="text-red-500 mb-4 text-center font-semibold">{fetchError}</p>
      )}

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by patient or doctor"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
        disabled={!!fetchError} // disable if there was a fetch error
      />

      <table className="w-full table-auto border-collapse border border-gray-300 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Patient</th>
            <th className="border px-4 py-2 text-left">Doctor</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={2} className="text-center py-4 text-gray-500">
                {fetchError ? "Cannot load assignments" : "No assignments found"}
              </td>
            </tr>
          ) : (
            filteredData.map((a, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{a.patientName}</td>
                <td className="border px-4 py-2">{a.doctorName}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}