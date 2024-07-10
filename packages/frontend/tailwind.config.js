/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#facc15",
        "secondary": "#6b7280",
        "secondary-light": "#d1d5db",
        "secondary-dark": "#000000"
      }
    },
  },
  plugins: [],
}