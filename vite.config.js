import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts}"],
  theme: {
  extend: {},
  },
  plugins: [
    tailwindcss(),
  ],
})

