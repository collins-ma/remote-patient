"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import { toast } from "sonner"

import { useAction } from "next-safe-action/hooks"
import { createUserAction } from "@/app/actions/createUserAction"
import { createUserSchema, type createUserSchemaType } from "@/app/zod-schemas/user"

export default function CreateUserForm() {
  const form = useForm<createUserSchemaType>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      role: "PATIENT",
    },
  })

  const { execute, isPending, reset } = useAction(createUserAction, {
    onSuccess({ data }) {
      if (data?.message) {
        toast.success(data.message)
        form.reset()
      }
    },
    onError({ error }) {
      toast.error(error.serverError ?? "Something went wrong")
    },
  })

  function onSubmit(data: createUserSchemaType) {
    execute(data)
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-50 border rounded-lg p-6 shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create User</h2>

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Email */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 font-medium">Email</label>
          <input
            type="email"
            {...form.register("email")}
            className={`w-full border px-3 py-2 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              form.formState.errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
          )}
        </div>

        {/* Username */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 font-medium">Username</label>
          <input
            type="text"
            {...form.register("username")}
            className={`w-full border px-3 py-2 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              form.formState.errors.username ? "border-red-500" : "border-gray-300"
            }`}
          />
          {form.formState.errors.username && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.username.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 font-medium">Password</label>
          <input
            type="password"
            {...form.register("password")}
            className={`w-full border px-3 py-2 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              form.formState.errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {form.formState.errors.password && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.password.message}</p>
          )}
        </div>

        {/* Role */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 font-medium">Role</label>
          <select
            {...form.register("role")}
            className="w-full border px-3 py-2 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
          >
            <option value="PATIENT">Patient</option>
            <option value="DOCTOR">Doctor</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white py-2 rounded-md flex justify-center gap-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <LoaderCircle className="animate-spin" />
              Creating…
            </>
          ) : (
            "Create User"
          )}
        </button>

        {/* Reset */}
        <button
          type="button"
          onClick={() => {
            form.reset()
            reset()
          }}
          className="border py-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          Reset
        </button>
      </form>
    </div>
  )
}