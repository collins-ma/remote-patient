"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function SignIn() {
  
  const router = useRouter()

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault() // prevent default form submission

    const formData = new FormData(e.currentTarget)
    const username = formData.get("username")?.toString()
    const password = formData.get("password")?.toString()

    if (!username || !password) {
      alert("Please enter both username and password")
      return
    }

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    })

    if (result?.error) {
      alert("Invalid username or password")
    }
    else {
      // Successful login, redirect to dashboard
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">Sign In</h2>

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
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}