/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#07090f',
          raised: '#0e131c',
          overlay: '#151b28',
        },
        accent: {
          DEFAULT: '#2dd4bf',
          bright: '#5eead4',
          cyan: '#22d3ee',
          violet: '#7c6af0',
          glow: '#2dd4bf',
        },
        ink: {
          DEFAULT: '#e8eef8',
          muted: '#93a0b5',
          dim: '#64708a',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'accent-gradient':
          'linear-gradient(135deg, #2dd4bf 0%, #22d3ee 45%, #7c6af0 100%)',
        'hero-mesh':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(45, 212, 191, 0.18), transparent), radial-gradient(ellipse 60% 40% at 85% 45%, rgba(34, 211, 238, 0.1), transparent), radial-gradient(ellipse 50% 35% at 15% 75%, rgba(124, 106, 240, 0.12), transparent)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(45, 212, 191, 0.22)',
        'glow-sm': '0 0 20px rgba(45, 212, 191, 0.16)',
        'glow-cyan': '0 0 30px rgba(34, 211, 238, 0.22)',
        'glow-violet': '0 0 30px rgba(124, 106, 240, 0.18)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
