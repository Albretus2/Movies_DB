/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html, js}", "*.html"],
  theme: {
    extend: {
      fontFamily: {
        montserat: "Montserrat",
      },
    },
  },
  daisyui: {
    themes: ["fantasy", "nord"],
  },
  plugins: [require("daisyui")],
};
