/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'regularBlack':'#000000',
      'regularWhite':'#FFFFFF',

      'encoredBlack':'#161616',
      'encoredGold':'#EACB7C',
      'encoredGrey':'#454545'

    },
    fontFamily:{
      'montserrat':['Montserrat'],
      'robot':['Roboto']
    },
    extend: {},
  },
  plugins: [],
}

