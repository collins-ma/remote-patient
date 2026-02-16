import { z } from "zod";

export const vitalSchema = z.object({
  patientId: z.number().int().positive(),
  highPressure: z.number().int().positive(),
  lowPressure: z.number().int().positive(),
});

export type VitalSchemaType = z.infer<typeof vitalSchema>;