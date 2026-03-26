"use client";

import { CheckCircle, AlertCircle, XCircle } from "lucide-react";

type Vital = {
  id: number;
  patientId: number;
  highPressure: number;
  lowPressure: number;
  createdAt: string;
  healthStatus: "GOOD" | "AVERAGE" | "CRITICAL";
};

interface Props {
  vitals: Vital[];
}

export default function VitalsClient({ vitals }: Props) {
  if (vitals.length === 0)
    return (
      <p className="text-gray-600 dark:text-gray-400">
        No vitals recorded yet.
      </p>
    );

  const statusConfig = {
    GOOD: {
      icon: (
        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-1" />
      ),
      color: "text-green-600 dark:text-green-400",
    },
    AVERAGE: {
      icon: (
        <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-1" />
      ),
      color: "text-yellow-600 dark:text-yellow-400",
    },
    CRITICAL: {
      icon: (
        <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-1" />
      ),
      color: "text-red-600 dark:text-red-400",
    },
  };

  return (
    <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 uppercase tracking-wider">
            <th className="px-6 py-3 text-left">High Pressure</th>
            <th className="px-6 py-3 text-left">Low Pressure</th>
            <th className="px-6 py-3 text-left">Recorded At</th>
            <th className="px-6 py-3 text-left">Health Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-200">
          {vitals.map((vital, index) => {
            const config = statusConfig[vital.healthStatus];

            return (
              <tr
                key={vital.id}
                className={`transition-colors duration-200
                  ${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-900"
                      : "bg-gray-50 dark:bg-gray-800"
                  }
                  hover:bg-blue-100 dark:hover:bg-gray-700`}
              >
                <td className="px-6 py-4 font-medium">
                  {vital.highPressure}
                </td>

                <td className="px-6 py-4">
                  {vital.lowPressure}
                </td>

                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                  {new Date(vital.createdAt).toLocaleString()}
                </td>

                <td className={`px-6 py-4 font-semibold ${config.color}`}>
                  <div className="flex items-center">
                    {config.icon}
                    {vital.healthStatus.charAt(0) +
                      vital.healthStatus.slice(1).toLowerCase()}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}