/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#f2eadc',
          raised: '#fffaf0',
          overlay: '#171717',
        },
        accent: {
          DEFAULT: '#c83d22',
          bright: '#b8321a',
          cyan: '#2457f5',
          violet: '#7a43d1',
          glow: '#c9f31d',
        },
        ink: {
          DEFAULT: '#171717',
          muted: '#514d47',
          dim: '#675f55',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'accent-gradient':
          'linear-gradient(135deg, #c83d22 0%, #ff8a34 48%, #c9f31d 100%)',
        'hero-mesh':
          'radial-gradient(circle at 85% 15%, rgba(201, 243, 29, 0.75) 0 12%, transparent 12.5%), radial-gradient(circle at 8% 88%, rgba(36, 87, 245, 0.18) 0 18%, transparent 18.5%)',
      },
      boxShadow: {
        glow: '8px 8px 0 #171717',
        'glow-sm': '4px 4px 0 #171717',
        'glow-cyan': '6px 6px 0 #2457f5',
        'glow-violet': '6px 6px 0 #7a43d1',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
