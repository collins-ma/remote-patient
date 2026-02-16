export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      
      {/* NAVBAR */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">
          RPM System
        </h1>

        <nav className="space-x-4">
          <a href="/login" className="text-gray-300 hover:text-white">
            Sign In
          </a>
          <a
            href="/register"
            className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600"
          >
            Get Started
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-28 text-center bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
          Remote Patient Monitoring, Simplified
        </h2>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Monitor patient vitals securely, connect doctors with patients,
          and improve healthcare outcomes — all in one platform.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/login"
            className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-600"
          >
            Sign In
          </a>

          <a
            href="/learn-more"
            className="px-6 py-3 border border-gray-500 rounded-lg hover:bg-gray-800"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-gray-800 py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          
          <div className="p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2 text-white">For Patients</h3>
            <p className="text-gray-300">
              Submit vitals from home and track your health over time.
            </p>
          </div>

          <div className="p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2 text-white">For Doctors</h3>
            <p className="text-gray-300">
              View patient vitals in real time and intervene early.
            </p>
          </div>

          <div className="p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2 text-white">For Admins</h3>
            <p className="text-gray-300">
              Manage users, assignments, and system access securely.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-gray-400 border-t border-gray-700">
        © {new Date().getFullYear()} RPM System. All rights reserved.
      </footer>

    </main>
  )
}