"use client"

import { useAction } from "next-safe-action/hooks"
import { updateHealthStatusAction } from "@/app/actions/updateHealthStatusAction"
import { toast } from "sonner"
import { LoaderCircle } from "lucide-react"

export default function HealthStatusDropdown({
  patientId,
  currentStatus,
}: {
  patientId: number
  currentStatus: "GOOD" | "AVERAGE" | "CRITICAL" | null
}) {
  const { execute, isPending } = useAction(updateHealthStatusAction, {
    onSuccess({ data }) {
      if (data?.message) toast.success(data.message)
    },
    onError({ error }) {
      toast.error(error.serverError ?? "Update failed")
    },
  })

  return (
    <div className="flex items-center gap-4">
      <label className="font-semibold text-gray-700 dark:text-gray-200">
        Health Status:
      </label>

      <div className="relative">
        <select
          defaultValue={currentStatus ?? "GOOD"}
          disabled={isPending}
          onChange={(e) =>
            execute({
              patientId: patientId.toString(),
              healthStatus: e.target.value as
                | "GOOD"
                | "AVERAGE"
                | "CRITICAL",
            })
          }
          className="appearance-none
                     px-4 py-2 pr-10 rounded-lg
                     border border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-800
                     text-gray-800 dark:text-gray-200
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     transition
                     cursor-pointer"
        >
          <option value="GOOD">GOOD</option>
          <option value="AVERAGE">AVERAGE</option>
          <option value="CRITICAL">CRITICAL</option>
        </select>

        {/* Custom dropdown arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400">
          ▼
        </div>
      </div>

      {isPending && (
        <LoaderCircle
          className="animate-spin text-gray-600 dark:text-gray-300"
          size={18}
        />
      )}
    </div>
  )
}