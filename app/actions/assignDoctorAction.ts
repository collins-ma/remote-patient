"use server"

import { refresh } from "next/cache"
import { actionClient } from "../lib/safe-action"
import { assignDoctorSchema, type assignDoctorSchemaType } from "@/app/zod-schemas/assignDoctorSchema"
import { flattenValidationErrors } from "next-safe-action"
import { prisma } from "@/app/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export const assignDoctorAction = actionClient
  .metadata({ actionName: "assignDoctorAction" })
  .inputSchema(assignDoctorSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }: { parsedInput: assignDoctorSchemaType }) => {
    // 🔐 Auth
    const session = await auth()

    if (!session) redirect("/login")

    if (session.user.role !== "ADMIN") {
      
      return { error: "Unauthorized: Admin access required" }
    }

    const { doctorId, patientId } = parsedInput

    // ✅ Doctor check (role + table)

    
    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
      include: { user: true },
    })

    if (!doctor || doctor.user.role !== "DOCTOR") {
      return { error: "Selected user is not a valid doctor" }
    }

    // ✅ Patient check (role + table)
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      include: { user: true },
    })

    if (!patient || patient.user.role !== "PATIENT") {
      return { error: "Selected user is not a valid patient" }
    }

    // 🔁 Assign doctor
    await prisma.patient.update({
      where: { id: patientId },
      data: { doctorId },
    })

    refresh()

    return {
      message: `Patient ${patient.user.username} assigned to Doctor ${doctor.user.username}`,
    }
  })