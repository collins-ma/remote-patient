"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoaderCircle } from "lucide-react"
import { signIn } from "next-auth/react"

export default function SignIn() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const username = formData.get("username")?.toString()
    const password = formData.get("password")?.toString()

    if (!username || !password) {
      setError("Please enter both username and password")
      setLoading(false)
      return
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
      })

      if (result?.error) {
        setError("Invalid username or password")
        setLoading(false)
        return
      }

      // ⚡ Use NextAuth session info via server action after login
      const res = await fetch("/api/auth/session")
      const session = await res.json()
      const role = session?.user?.role

      // Redirect based on role
      if (role === "DOCTOR") router.push("/doctor-view")
      else if (role === "PATIENT") router.push("/patient-view")
      else if (role === "ADMIN") router.push("/users")
      else router.push("/") // fallback

    } catch (err) {
      setError("Something went wrong. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">Sign In</h2>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <div className="flex flex-col">
          <label htmlFor="username" className="mb-2 text-gray-700 font-medium">
            Username
          </label>
          <input
            name="username"
            id="username"
            type="text"
            required
            placeholder="Enter your username"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 text-gray-700 font-medium">
            Password
          </label>
          <input
            name="password"
            id="password"
            type="password"
            required
            placeholder="Enter your password"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <LoaderCircle className="animate-spin" />
              Signing In…
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  )
}