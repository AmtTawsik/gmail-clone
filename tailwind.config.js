/** @type {import('tailwindcss').Config} */
import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons'
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./node_modules/flowbite/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#e2f7e8",
          200: '#D5EEDC',
          300: '#B9E2C4',
          500: '#26873E',
          700: '#268D41',
          800: '#175427'
        },
        neutral: {
          200: '#D6D6D6',
          300: '#C2C2C2',
          500: '#383838',
          700: '#1D1D21',
          800: '#101010'
        }
      },
      backgroundColor: {
        primary: {
          100: "#e2f7e8",
          200: '#D5EEDC',
          300: '#B9E2C4',
          500: '#26873E',
          700: '#268D41',
          800: '#175427'
        },
        neutral: {
          200: '#D6D6D6',
          300: '#C2C2C2',
          500: '#383838',
          700: '#1D1D21',
          800: '#101010'
        }
      },
      borderColor: {
        primary: {
          100: "#e2f7e8",
          200: '#D5EEDC',
          300: '#B9E2C4',
          500: '#26873E',
          700: '#268D41',
          800: '#175427'
        },
        neutral: {
          200: '#D6D6D6',
          300: '#C2C2C2',
          500: '#383838',
          700: '#1D1D21',
          800: '#101010'
        }
      },
      fill: {
        primary: {
          100: "#e2f7e8",
          200: '#D5EEDC',
          300: '#B9E2C4',
          500: '#26873E',
          700: '#268D41',
          800: '#175427'
        }
      }
    },
  },
  plugins: [
    iconsPlugin({
      collections: getIconCollections(['mdi'])
    }),
    require('flowbite/plugin')
  ],
}

