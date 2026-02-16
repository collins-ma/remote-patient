import { z } from "zod"

export const assignDoctorSchema = z.object({
  doctorId: z.coerce.number().int().positive({ message: "Doctor ID is required" }),
  patientId: z.coerce.number().int().positive({ message: "Patient ID is required" }),
})

export type assignDoctorSchemaType = z.infer<typeof assignDoctorSchema>