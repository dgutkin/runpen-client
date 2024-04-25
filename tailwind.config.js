/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "dark-green": "#013220",
        "white": "#ffffff",
        "black": "#000000",
        "battleship-gray": "#798478",
        "yinmn-blue": "#36558f"
      },
      animation: {
        wiggle: "wiggle 1s linear infinite"
      },
      keyframes: {
        wiggle: {
          "0%": { transform: "rotate(0deg);" },
          "25%": { transform: "rotate(3deg);" },
          "50%": { transform: "rotate(0deg);" },
          "75%": { transform: "rotate(-3deg);" },
          "100%": { transform: "rotate(0deg);" }
        }
      }
    }
  },
  plugins: [],
}
