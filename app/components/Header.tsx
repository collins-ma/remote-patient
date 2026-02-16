"use client"

import ThemeToggle from "./theme-toggle"

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
      <h1 className="text-lg font-bold">RPM App</h1>
      <ThemeToggle />
    </header>
  )
}