/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0a0a0f',
          raised: '#12121a',
          overlay: '#1a1a26',
        },
        accent: {
          DEFAULT: '#8b5cf6',
          bright: '#a78bfa',
          cyan: '#22d3ee',
          glow: '#7c3aed',
        },
        ink: {
          DEFAULT: '#e8e8f0',
          muted: '#9ca3af',
          dim: '#6b7280',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'accent-gradient':
          'linear-gradient(135deg, #8b5cf6 0%, #22d3ee 100%)',
        'hero-mesh':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139, 92, 246, 0.25), transparent), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(34, 211, 238, 0.08), transparent), radial-gradient(ellipse 50% 30% at 20% 80%, rgba(124, 58, 237, 0.12), transparent)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(139, 92, 246, 0.25)',
        'glow-sm': '0 0 20px rgba(139, 92, 246, 0.2)',
        'glow-cyan': '0 0 30px rgba(34, 211, 238, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
