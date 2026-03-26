"use client"

import HealthStatusDropdown from "./HealthStatusDropdown"

export default function PatientVitalsCard({ patient }: { patient: any }) {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-800/40 rounded-xl p-6 space-y-6 transition-colors">
      
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
        {patient.user.username}'s Vitals
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {patient.vitals.map((v: any) => (
          <div
            key={v.id}
            className="border border-gray-200 dark:border-gray-700 
                       bg-gray-50 dark:bg-gray-800 
                       p-4 rounded-lg 
                       text-gray-700 dark:text-gray-200
                       hover:shadow-md transition"
          >
            <p className="font-medium">
              High Pressure: <span className="font-normal">{v.highPressure}</span>
            </p>

            <p className="font-medium">
              Low Pressure: <span className="font-normal">{v.lowPressure}</span>
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Date: {new Date(v.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="pt-2">
        <HealthStatusDropdown
          patientId={patient.id}
          currentStatus={patient.healthStatus}
        />
      </div>
    </div>
  )
}