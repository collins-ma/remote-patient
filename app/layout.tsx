import type { Metadata } from "next"
import { Toaster } from "sonner"
import { ThemeProvider } from "next-themes"
import { Geist, Geist_Mono } from "next/font/google"
import Header from "./components/Header"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "RPM App",
  description: "Remote Patient Monitoring System",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Header />

          <main>{children}</main>

          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}