// app/patient/vitals/page.tsx

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import SubmitVitalsForm from "./SubmitVitalsForm"

export default async function PatientVitalsPage() {
  const session = await auth()

  if (!session) redirect("/login")

  if (session.user.role !== "PATIENT") {
    redirect("/unauthorized")
  }

  return (
    <div className="p-6">
      <SubmitVitalsForm patientId={Number(session.user.id)} />
    </div>
  )
}