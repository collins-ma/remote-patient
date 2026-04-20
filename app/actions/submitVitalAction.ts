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

export type VitalSchemaType = z.input<typeof vitalSchema>;

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

    // Ensure patient only submits their own vitals
    if (Number(session.user.id) !== patientId) {
      return { error: "You can only submit your own vitals." };
    }

    // Save vitals
    await prisma.vital.create({
      data: {
        patientId,
        highPressure,
        lowPressure,
      },
    });

    const HIGH_PRESSURE_THRESHOLD = 140;
    const LOW_PRESSURE_THRESHOLD = 90;

    // If abnormal vitals
    if (
      highPressure >= HIGH_PRESSURE_THRESHOLD ||
      lowPressure >= LOW_PRESSURE_THRESHOLD
    ) {
      const patient = await prisma.patient.findUnique({
        where: { id: patientId },
        include: {
          user: true,
          doctor: {
            include: {
              user: true,
            },
          },
        },
      });

      if (patient) {
        // =========================
        // PATIENT NOTIFICATION
        // =========================
        const patientMessage = `
Hi ${patient.user.username},

Your recent blood pressure reading was:

High: ${highPressure}
Low: ${lowPressure}

This exceeds the safe threshold. Please consult your assigned doctor: ${
          patient.doctor?.user.username || "Not Assigned"
        }.

Stay safe,
Health App
`;

        await notifyPatientByEmail(patient.user.email, patientMessage);

        // =========================
        // DOCTOR NOTIFICATION
        // =========================
        if (patient.doctor?.user.email) {
          const doctorMessage = `
Hello Dr. ${patient.doctor.user.username},

Your patient ${patient.user.username} has recorded abnormal blood pressure readings:

High: ${highPressure}
Low: ${lowPressure}

Please review and take appropriate action.

Health App System
`;

          await notifyPatientByEmail(
            patient.doctor.user.email,
            doctorMessage
          );
        }
      }
    }

    refresh();

    return {
      message: "Vitals submitted successfully.",
    };
  });