"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useAction } from "next-safe-action/hooks"
import { assignDoctorAction } from "@/app/actions/assignDoctorAction"
import { assignDoctorSchema } from "@/app/zod-schemas/assignDoctorSchema"
import { z } from "zod"

type Props = {
  doctors: { id: number; username: string }[]
  patients: { id: number; username: string }[]
}

type AssignDoctorFormValues = z.input<typeof assignDoctorSchema>

export default function AssignDoctorForm({ doctors, patients }: Props) {
  const form = useForm<AssignDoctorFormValues>({
    resolver: zodResolver(assignDoctorSchema),
    defaultValues: {
      doctorId: doctors[0]?.id ?? 0,
      patientId: patients[0]?.id ?? 0,
    },
  })

  const { execute, isPending, reset } = useAction(assignDoctorAction, {
    onSuccess({ data }) {
      if (data?.message) toast.success(data.message)
      reset()
    },
    onError({ error }) {
      toast.error(error?.serverError ?? "Failed to assign doctor")
    },
  })

  function onSubmit(data: AssignDoctorFormValues) {
    console.log("Submitting form with data:", data)
    execute(data)
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-lg flex flex-col gap-6 transition-colors duration-300"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
          Assign Doctor to Patient
        </h2>

        {/* Doctor Selection */}
        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700 dark:text-gray-200">Doctor</label>
          <select
            {...form.register("doctorId", { valueAsNumber: true })}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          >
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.username}
              </option>
            ))}
          </select>
        </div>

        {/* Patient Selection */}
        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700 dark:text-gray-200">Patient</label>
          <select
            {...form.register("patientId", { valueAsNumber: true })}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          >
            {patients.map((pat) => (
              <option key={pat.id} value={pat.id}>
                {pat.username}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-all duration-200"
        >
          {isPending ? "Assigning…" : "Assign Doctor"}
        </button>
      </form>
    </div>
  )
}