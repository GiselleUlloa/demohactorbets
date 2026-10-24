/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#6D28D9',
          purpleLight: '#EDE9FE',
          purpleDark: '#4C1D95',
          emerald: '#059669',
          emeraldLight: '#D1FAE5',
          emeraldDark: '#065F46',
          surface: '#FAFAFC',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
