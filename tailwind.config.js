/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: { DEFAULT: '#f7f7f2', raised: '#eef0e8', overlay: '#242c26' },
        ink: { DEFAULT: '#242722', muted: '#60655c', dim: '#74796f' },
        accent: { DEFAULT: '#345847' },
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
