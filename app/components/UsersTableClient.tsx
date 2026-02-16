"use client"

import { useState, useMemo } from "react"
import { toast } from "sonner"

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

  const filteredUsers = useMemo(() => {
    if (!search) return initialUsers
    return initialUsers.filter(
      (user) =>
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, initialUsers])

  if (fetchError) {
    toast.error(fetchError)
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-200 text-red-800"
      case "DOCTOR":
        return "bg-green-200 text-green-800"
      case "PATIENT":
      default:
        return "bg-blue-200 text-blue-800"
    }
  }

  return (
    <div className="overflow-x-auto border rounded-xl shadow-lg bg-white p-6">
      {fetchError && (
        <p className="text-red-600 font-medium mb-4">{fetchError}</p>
      )}

      <input
        type="text"
        placeholder="Search by username or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
        disabled={!!fetchError}
      />

      <table className="min-w-full divide-y divide-gray-200 table-auto">
        <thead className="bg-blue-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Username</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Created At</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-400 italic">
                {fetchError ? "Cannot load users" : "No users found"}
              </td>
            </tr>
          ) : (
            filteredUsers.map((user, idx) => (
              <tr
                key={user.id}
                className={`transition-colors duration-200 ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-100`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(user.role)}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
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