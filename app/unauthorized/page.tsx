"use client"

import { useRouter } from "next/navigation"

export default function UnauthorizedPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold">Access Denied</h1>

        <p className="text-muted-foreground">
          You do not have permission to access this page.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 rounded-lg bg-secondary"
          >
            Go Back
          </button>

          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 rounded-lg bg-primary text-white"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  )
}