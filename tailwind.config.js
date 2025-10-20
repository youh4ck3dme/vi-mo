/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./{components,contexts,hooks,utils,data}/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./index.tsx"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand-dark': '#003844',
        'brand-teal': '#008980',
        'brand-green': '#35D86D',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}