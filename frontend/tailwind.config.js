/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "450px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      xlsm: { min: "0px", max: "450px" },
    },
    colors: {
      semilight : "#8ac4ed",
      light : "#3E92CC",
      off : "#18435A",
      mid : "#2A628F",
      dark : "#13293D",
      semidark : "#16324F"
    },
    extend: {
      fontFamily: {
        Mont: ["Montserrat"],
      },
    },
    plugins: [],
  },
};
