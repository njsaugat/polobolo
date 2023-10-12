/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    theme: {
      minHeight: {
        "1/2": "1000px",
      },
    },
    extend: {
      colors: {
        "theme-color": "bg-gradient-to-r from-teal-200 to-teal-500",
        "orange-theme": "rgb(94 234 212)",
        "orange-light-theme": "#rgb(153 246 228)",
        "orange-dim": "rgb(204 251 241)",
      },
      fontFamily: {
        // "font-family": ["Manrope", "sans-serif"],
        mooli: ["Mooli", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        cursive: ["Allura", "cursive"],
      },
      keyframes: {
        wiggle: {
          "0% ": { transform: "translate-" },
          "100%": { transform: "rotate(3deg)" },
        },
      },
      keyframes: {
        grow: {
          "0%": {
            transform: "translate(-100%)",
          },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        grow: "grow 3s linear infinite",
      },
    },
  },
  plugins: [],
};
