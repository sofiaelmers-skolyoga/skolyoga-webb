/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Exact colors from Grafisk Profil (Manual för Skolyoga)
          darkGrey: "#6F6F6E",       // Basfärg 1 (Text & Dark elements - RGB: 111, 111, 110)
          sand: "#F6F5EE",           // Basfärg 2 (Warm off-white background - RGB: 246, 245, 238)
          warmYellow: "#FFE271",     // Accentfärg 1 (Warm Yellow - RGB: 255, 226, 113)
          dustyPink: "#E29B9D",      // Accentfärg 1 variant (Dusty Pink - RGB: 226, 155, 157)
          dustyPurple: "#8C2272",    // Accentfärg 2 (Dusty Purple - RGB: 140, 34, 114)
          dustyTurquoise: "#70B9BA", // Accentfärg 3 (Dusty Turquoise - RGB: 112, 185, 186)

          // Semantic mappings aligning with app theme
          primary: "#E29B9D",
          primaryDark: "#B87678",
          secondary: "#70B9BA",
          dark: "#2A2A2A",
          charcoal: "#4A4A48",
          muted: "#6F6F6E",
          sandDark: "#ECE8DC",

          // Backwards compatibility aliases
          coral: "#E29B9D",
          rose: "#E29B9D",
          teal: "#70B9BA",
          yellow: "#FFE271",
          plum: "#8C2272",
        },
      },
      fontFamily: {
        serif: ["Cardo", "Georgia", "Cambria", "Times New Roman", "serif"],
        cardo: ["Cardo", "Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
