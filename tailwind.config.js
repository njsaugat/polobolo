/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "theme-color": "bg-gradient-to-r from-teal-200 to-teal-500",
      },
      fontFamily: {
        // "font-family": ["Manrope", "sans-serif"],
        mooli: ["Mooli", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        cursive: ["Allura", "cursive"],
      },
    },
  },
  plugins: [],
};
