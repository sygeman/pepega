/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6441A4",
        background: "#1D1E31",
        accent: "#968A9D",
        surface: "#262841",
        gold: "#a48b3f",
        twitch: "#6542a6",
      },
      fontFamily: false,
    },
  },
};
