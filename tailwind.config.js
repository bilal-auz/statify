/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        s_green: "#1DB954",
        s_black: "#191414",
        s_white: "#FFFFFF",
      },
    },
  },
  plugins: [require("daisyui")],
};
