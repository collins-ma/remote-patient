"use client";
export default function DashboardPage() {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="max-w-3xl w-full bg-white p-8 rounded-2xl shadow-lg space-y-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">
            Welcome to your dashboard! This is a placeholder page for your content.
          </p>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-blue-100 p-6 rounded-lg shadow-sm">
              <h2 className="font-semibold text-lg text-blue-800">Section 1</h2>
              <p className="text-blue-700 mt-2">Some sample content here.</p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg shadow-sm">
              <h2 className="font-semibold text-lg text-green-800">Section 2</h2>
              <p className="text-green-700 mt-2">More placeholder content.</p>
            </div>
            <div className="bg-yellow-100 p-6 rounded-lg shadow-sm">
              <h2 className="font-semibold text-lg text-yellow-800">Section 3</h2>
              <p className="text-yellow-700 mt-2">Even more sample content.</p>
            </div>
            <div className="bg-purple-100 p-6 rounded-lg shadow-sm">
              <h2 className="font-semibold text-lg text-purple-800">Section 4</h2>
              <p className="text-purple-700 mt-2">And some final content here.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }