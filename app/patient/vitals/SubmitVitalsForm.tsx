// app/patient/vitals/SubmitVitalsForm.tsx
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useAction } from "next-safe-action/hooks"
import { submitVitalAction } from "@/app/actions/submitVitalAction"
import { vitalSchema } from "@/app/zod-schemas/vitalSchema"
import { z } from "zod"

type Props = {
  patientId: number
}

// Zod input type
type VitalFormValues = z.input<typeof vitalSchema>

export default function SubmitVitalsForm({ patientId }: Props) {
  const form = useForm<VitalFormValues>({
    resolver: zodResolver(vitalSchema),
    defaultValues: {
      patientId,
      highPressure: 120,
      lowPressure: 80,
    },
  })

  const { execute, isPending } = useAction(submitVitalAction, {
    onSuccess({ data }) {
      if (data?.message) toast.success(data.message)
     
    },
    onError({ error }) {
      toast.error(error?.serverError ?? "Failed to submit vitals")
    },
  })

  const onSubmit = (data: VitalFormValues) => {
    console.log("Submitting vitals:", data)
    execute(data)
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white shadow-lg p-6 rounded-xl w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Submit Your Blood Pressure</h2>

        <label className="font-medium">Systolic (High Pressure)</label>
        <input
          type="number"
          {...form.register("highPressure", { valueAsNumber: true })}
          className="border rounded px-3 py-2 w-full"
        />

        <label className="font-medium">Diastolic (Low Pressure)</label>
        <input
          type="number"
          {...form.register("lowPressure", { valueAsNumber: true })}
          className="border rounded px-3 py-2 w-full"
        />

        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          {isPending ? "Submitting…" : "Submit Vitals"}
        </button>
      </form>
    </div>
  )
}