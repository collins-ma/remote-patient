"use server";
import { notifyPatientByEmail } from "@/lib/email";
import { refresh } from "next/cache";
import { actionClient } from "../lib/safe-action";
import { z } from "zod";
import { flattenValidationErrors } from "next-safe-action";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { vitalSchema } from "../zod-schemas/vitalSchema";

// ✅ Zod schema for validation


export type VitalSchemaType = z.input<typeof vitalSchema>;

// ✅ Action to submit vitals (no try/catch)
export const submitVitalAction = actionClient
  .metadata({ actionName: "submitVitalAction" })
  .inputSchema(vitalSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }: { parsedInput: VitalSchemaType }) => {
    const session = await auth();
    if (!session) redirect("/login");

    const { patientId, highPressure, lowPressure } = parsedInput;

    // Ensure the patient is submitting their own vitals
    if (Number(session.user.id) !== patientId) {
      return { error: "You can only submit your own vitals." };
    }

     
    // 🔹 Create the vital record
     await prisma.vital.create({
      data: {
        patientId, // correct relation connect
        highPressure,
        lowPressure,
      },
    });

    const HIGH_PRESSURE_THRESHOLD = 140; // systolic
const LOW_PRESSURE_THRESHOLD = 90;
    if (highPressure >= HIGH_PRESSURE_THRESHOLD || lowPressure >= LOW_PRESSURE_THRESHOLD) {
  const patient = await prisma.patient.findUnique({
    where: { id: patientId },
    include: { user: true, doctor: { include: { user: true } } },
  });

  if (patient) {
    const message = `
Hi ${patient.user.username},

Your recent blood pressure reading was:

High: ${highPressure}
Low: ${lowPressure}

This exceeds the safe threshold. Please consult your assigned doctor: ${patient.doctor?.user.username}.

Stay safe,
Health App
`;

    await notifyPatientByEmail(patient.user.email, message);
  }


    // 🔹 Alert if blood pressure is high
  

    refresh(); // refresh server components if needed

    return {
      message: "Vitals submitted successfully.",
     
    };
  }
  });