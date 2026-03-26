"use server"
import { redirect } from "next/navigation"
import { refresh } from "next/cache"
import { actionClient } from "../lib/safe-action"
import { updateHealthStatusSchema, type updateHealthStatusSchemaType } from "@/app/zod-schemas/updateHealthStatusSchema"
import { flattenValidationErrors } from "next-safe-action"
import { prisma } from "@/app/lib/prisma"
import { auth } from "@/auth"


export const updateHealthStatusAction = actionClient
  .metadata({ actionName: "updateHealthStatusAction" })
  .inputSchema(updateHealthStatusSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }: { parsedInput: updateHealthStatusSchemaType }) => {
    const session = await auth()
    if (!session) redirect("/login")

    if (session.user.role !== "DOCTOR") {
      redirect('/unauthorized')
      
    }

    const { patientId, healthStatus } = parsedInput

    const doctor = await prisma.doctor.findUnique({
      where: { id: Number(session.user.id) },
    })

    if (!doctor) {
      return { error: "Doctor profile not found" }
    }

    const patient = await prisma.patient.findUnique({
      where: { id: Number(patientId) },
    })

    if (!patient || patient.doctorId !== doctor.id) {
      return { error: "Not assigned to this patient" }
    }

    await prisma.patient.update({
      where: { id: Number(patientId) },
      data: { healthStatus },
    })

    refresh()

    return { message: "Health status updated successfully" }
  })