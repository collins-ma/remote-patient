import { z } from "zod"

export const createUserSchema = z.object({
    email: z.string(),
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["PATIENT", "DOCTOR", "ADMIN"]),
})

export type createUserSchemaType = z.infer<typeof createUserSchema>