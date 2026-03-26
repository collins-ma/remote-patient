"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts"

type Vital = {
  createdAt: string | Date
  highPressure: number
  lowPressure: number
}

interface Props {
  data: Vital[]
}

export default function VitalsChart({ data }: Props) {
  const chartData = data.map((v) => ({
    date: new Date(v.createdAt).toLocaleDateString(),
    highPressure: v.highPressure,
    lowPressure: v.lowPressure,
  }))

  return (
    <div className="w-full h-80 bg-white dark:bg-gray-900 p-4 rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4">Blood Pressure Trend</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          {/* Red line for high BP danger */}
          <ReferenceLine y={140} stroke="red" strokeDasharray="3 3" label="High BP" />

          <Line
            type="monotone"
            dataKey="highPressure"
            stroke="#FF4D4F"
            name="High (Systolic)"
          />
          <Line
            type="monotone"
            dataKey="lowPressure"
            stroke="#1890FF"
            name="Low (Diastolic)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}