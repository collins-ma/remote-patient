"use client"

import { useState, useRef, useEffect } from "react"
import ThemeToggle from "./theme-toggle"
import { MenuIcon, LogOut, House } from "lucide-react"
import { signOut } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Routes where House icon is hidden
  const houseHiddenRoutes = ["/", "/login", "/users", "/patient-view", "/doctor-view"]
  const showHouse = !houseHiddenRoutes.includes(pathname)

  // Routes where hamburger + theme toggle are hidden
  const hideControls = pathname === "/" || pathname === "/login"
  console.log(hideControls)
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
      
      {/* Left side: House icon */}
      <div className="flex items-center">
        {showHouse && (
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <House className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Right side: Theme toggle + Hamburger menu */}
      <div className="flex items-center gap-4">
        {!hideControls && <ThemeToggle />}

        {!hideControls && (
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <MenuIcon className="w-6 h-6" />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50">
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 gap-2"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}