/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffffff",
        secondary: "#bfc500",
      },
      boxShadow: {
        default: "0px 0px 32px -6px rgba(0, 0, 0, 0.2)",
      },
      animation: {
        trackLeft: "trackLeft 25s linear infinite",
        trackLeft2: "trackLeft2 25s linear infinite",
        trackRight: "trackRight 25s linear infinite",
        trackRight2: "trackRight2 25s linear infinite",
      },
      keyframes: {
        trackLeft: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        trackLeft2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        trackRight: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" },
        },
        trackRight2: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};
