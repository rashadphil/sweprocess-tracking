module.exports = {
  purge: {
    options: {
      safelist: [/bg-/, /text-/]
    }
  },
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [require('tailwind-scrollbar-hide')],
  darkMode: 'class'
}
