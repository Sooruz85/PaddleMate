/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ["'Playfair Display'", "serif"], // Police principale
        sarto: ["'Racing Sans One'", "sans-serif"], // Police spécifique pour "PaddelMate"
      },
      colors: {
        primary: "#1E3A8A", // Bleu foncé par défaut
        secondary: "#9333EA", // Violet
        accent: "#FBBF24", // Jaune
      },
      backgroundColor: {
        transparentBlack: "rgba(0, 0, 0, 0.5)", // Fond semi-transparent noir
        transparentWhite: "rgba(255, 255, 255, 0.1)", // Fond semi-transparent blanc
      },
      boxShadow: {
        soft: "0 4px 10px rgba(0, 0, 0, 0.2)", // Ombre douce
      },
      backdropBlur: {
        sm: "4px",
        md: "8px",
        lg: "12px",
      }
    }
  },
  plugins: [],
};
