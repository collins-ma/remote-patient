import { createSafeActionClient } from "next-safe-action"
import { z } from "zod"
import type { NeonDbError } from "@neondatabase/serverless"

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    })
  },

  handleServerError(e) {
    // Neon unique constraint
    if (e.constructor?.name === "NeonDbError") {
      const err = e as NeonDbError
      if (err.code === "23505") {
        return `Unique entry required. ${err.detail ?? ""}`
      }
    }

    // Prisma unique constraint
    if (e.constructor?.name === "PrismaClientKnownRequestError") {
      return "Unique entry required. This value already exists."
    }

    // Generic fallback
    return "Something went wrong. Please try again later."
  },
})