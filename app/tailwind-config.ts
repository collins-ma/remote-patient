import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class", // critical for next-themes
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config