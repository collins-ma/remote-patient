"use client"

import { Sun, Moon, Monitor, Check } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () =>
      document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (!mounted) return null

  const currentIcon =
    theme === "dark" ? (
      <Moon className="h-5 w-5 transition-transform duration-300 rotate-0" />
    ) : theme === "light" ? (
      <Sun className="h-5 w-5 transition-transform duration-300 rotate-0" />
    ) : (
      <Monitor className="h-5 w-5 transition-transform duration-300 rotate-0" />
    )

  const options = [
    { label: "Light", value: "light", icon: Sun },
    { label: "Dark", value: "dark", icon: Moon },
    { label: "System", value: "system", icon: Monitor },
  ]

  return (
    <div ref={ref} className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-center h-10 w-10 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
      >
        {currentIcon}
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 mt-2 w-40 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg transform transition-all duration-200 origin-top ${
          open
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="p-1">
          {options.map((option) => {
            const Icon = option.icon
            const isActive = theme === option.value

            return (
              <button
                key={option.value}
                onClick={() => {
                  setTheme(option.value)
                  setOpen(false)
                }}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? "bg-gray-100 dark:bg-gray-800"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {option.label}
                </div>
                {isActive && <Check className="h-4 w-4" />}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}