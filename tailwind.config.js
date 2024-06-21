/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: 'Poppins',
        poppinsBold: 'Poppins-Bold'
      },
      colors: {
        primary: "#161622",
        secondary: {
          400: "#ffbf1b",
          500: "#ff9c01",
          600: "#e27400",
          700: "#bb4f02"
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      }
    },
  },
  plugins: [],
}

