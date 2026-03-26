import { z } from "zod"

export const updateHealthStatusSchema = z.object({
  patientId: z.string().min(1),
  healthStatus: z.enum(["GOOD", "AVERAGE", "CRITICAL"]),
})

export type updateHealthStatusSchemaType = z.infer<typeof updateHealthStatusSchema>