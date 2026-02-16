"use server"

import { refresh } from "next/cache"
import { actionClient } from "../lib/safe-action"
import { createUserSchema, type createUserSchemaType } from "../zod-schemas/user"
import { flattenValidationErrors } from "next-safe-action"
import { redirect } from "next/navigation"
import { prisma } from "@/app/lib/prisma"
import { auth } from "@/auth"
import bcrypt from "bcryptjs"

export const createUserAction = actionClient
  .metadata({ actionName: "createUserAction" })
  .inputSchema(createUserSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }: { parsedInput: createUserSchemaType }) => {

    // 🔐 Auth check
    const session = await auth()
    if (!session) redirect("/login")

      
      if (session.user.role !== "ADMIN") {
      redirect("/unauthorized")
    }



 

    const { email, username, password, role } = parsedInput

    // 🔒 Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // 🧠 Create user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        role,
      },
    })

    // ✅ IMPORTANT PART: create role-specific record
    if (role === "DOCTOR") {
      await prisma.doctor.create({
        data: {
          id: user.id, // shared primary key
        },
      })
    }

    if (role === "PATIENT") {
      await prisma.patient.create({
        data: {
          id: user.id, // shared primary key
        },
      })
    }

    refresh()

    return {
      message: `User "${user.username}" created successfully`,
    }
  })