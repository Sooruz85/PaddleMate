/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ["'Playfair Display'", "serif"], // Police principale élégante
        sarto: ["'Racing Sans One'", "sans-serif"], // Police unique pour "PaddelMate"
      },
      colors: {
        primary: "#1E3A8A", // Bleu foncé - Base du design
        secondary: "#9333EA", // Violet dynamique
        accent: "#FBBF24", // Jaune pour les éléments importants
        neutral: "#F3F4F6", // Gris clair pour le fond général
        dark: "#111827", // Noir profond pour le contraste
        light: "#E5E7EB", // Gris clair pour les bordures et fonds
      },
      backgroundColor: {
        transparentBlack: "rgba(0, 0, 0, 0.5)", // Fond semi-transparent noir
        transparentWhite: "rgba(255, 255, 255, 0.1)", // Fond semi-transparent blanc
        cardBg: "#FFFFFF", // Fond des cartes
      },
      boxShadow: {
        soft: "0 4px 10px rgba(0, 0, 0, 0.2)", // Ombre douce
        card: "0 6px 20px rgba(0, 0, 0, 0.15)", // Ombre pour les cartes
      },
      backdropBlur: {
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
      spacing: {
        18: "4.5rem", // Ajout d’un espace personnalisé
        22: "5.5rem",
        26: "6.5rem",
      },
      borderRadius: {
        xl: "1rem", // Bordures plus arrondies
        "2xl": "1.5rem",
      },
      screens: {
        xs: "480px", // Ajout d'un break point pour les petits écrans
      },
    },
  },
  plugins: [],
};
