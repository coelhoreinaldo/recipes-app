/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5B75FA',
        purple: '#8546E3',
        pink: '#FCA1FF',
        secondary: '#46B7E3',
        green: '#A2FAE1'
      }
    },
    fontFamily: {
      abc: ["Epilogue", "sans-serif"]
    }
  },
  plugins: [],
}

