"use client"

import { useState, useMemo, useEffect } from "react"
import { toast } from "sonner"
import Link from "next/link"
import { Plus } from "lucide-react"

type User = {
  id: number
  username: string
  email: string
  role: "PATIENT" | "DOCTOR" | "ADMIN"
  createdAt: Date
}

type Props = {
  initialUsers: User[]
  fetchError?: string | null
}

export default function UsersTableClient({ initialUsers, fetchError }: Props) {
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (fetchError) toast.error(fetchError)
  }, [fetchError])

  const filteredUsers = useMemo(() => {
    if (!search) return initialUsers
    return initialUsers.filter(
      (user) =>
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, initialUsers])

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "DOCTOR":
        return "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "PATIENT":
      default:
        return "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    }
  }

  return (
    <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg bg-white dark:bg-gray-950 p-6 transition-colors">
      
      {fetchError && (
        <p className="text-red-600 dark:text-red-400 font-medium mb-4">
          {fetchError}
        </p>
      )}

      {/* Top Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by username or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={!!fetchError}
          className="flex-1 px-4 py-3 rounded-lg
                     border border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-900
                     text-gray-800 dark:text-gray-200
                     placeholder-gray-400 dark:placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     shadow-sm transition"
        />

        <div className="flex flex-wrap gap-2">
          <Link
            href="/users/new"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition"
          >
            <Plus className="w-4 h-4" />
            Add New Patient
          </Link>

          <Link
            href="/admin/assign-doctor"
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-lg transition"
          >
            <Plus className="w-4 h-4" />
            Assign Doctor
          </Link>

          <Link
            href="/admin/doctor-patient"
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 text-white rounded-lg transition"
          >
            View Assignments
          </Link>
        </div>
      </div>

      {/* Users Table */}
      <table className="min-w-full table-auto text-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-100 dark:bg-gray-900">
          <tr className="text-gray-700 dark:text-gray-200 uppercase tracking-wider">
            <th className="px-6 py-3 text-left">ID</th>
            <th className="px-6 py-3 text-left">Username</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Role</th>
            <th className="px-6 py-3 text-left">Created At</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-400 dark:text-gray-500 italic">
                {fetchError ? "Cannot load users" : "No users found"}
              </td>
            </tr>
          ) : (
            filteredUsers.map((user, idx) => (
              <tr
                key={user.id}
                className={`transition-colors duration-200
                  ${idx % 2 === 0 ? "bg-gray-50 dark:bg-gray-950" : "bg-white dark:bg-gray-900"}
                  hover:bg-gray-200 dark:hover:bg-gray-800`}
              >
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{user.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{user.username}</td>
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                  {new Date(user.createdAt).toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}