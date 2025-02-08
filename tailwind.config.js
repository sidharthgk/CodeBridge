// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A1A1A",          // Main background
        accent: "#D4AF37",           // Rich gold for accents
        charcoal: "#2D2D2D",         // Supporting dark tone
        slate: "#708090",            // A cool neutral
        warmGray: "#9E9E9E",         // Warm gray for text/secondary elements
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', "Arial", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem", // More pronounced rounded corners
      },
      boxShadow: {
        glass: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
