/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class", 
  theme: {
    extend: {
      fontFamily: {
        // Default UI font
        sans: [
          "Plus Jakarta Sans",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Ubuntu",
          "Cantarell",
          "Noto Sans",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        // Optional display/accent font
        display: [
          "Winky Rough",
          "Plus Jakarta Sans",
          "ui-sans-serif",
          "system-ui",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
