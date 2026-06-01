import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A1628',
          mid: '#0F2044',
          light: '#1a3a6b',
        },
        blue: {
          DEFAULT: '#1565C0',
          light: '#1E88E5',
          lighter: '#42A5F5',
        },
        teal: {
          DEFAULT: '#00ACC1',
          light: '#26C6DA',
          lighter: '#80DEEA',
        },
        gold: '#C9A84C',
        surface: '#F1F5F9',
        'off-white': '#F8FAFC',
        border: '#E2E8F0',
        'text-mid': '#475569',
        'text-soft': '#94A3B8',
      },
      fontFamily: {
        head: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
        '5xl': '40px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(10,22,40,0.08)',
        'card-md': '0 8px 32px rgba(10,22,40,0.10)',
        'card-lg': '0 20px 60px rgba(10,22,40,0.14)',
        'card-xl': '0 32px 80px rgba(10,22,40,0.18)',
        blue: '0 4px 20px rgba(21,101,192,0.30)',
        'blue-lg': '0 8px 32px rgba(21,101,192,0.40)',
        teal: '0 4px 20px rgba(0,172,193,0.30)',
        wpp: '0 8px 24px rgba(37,211,102,0.40)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #1565C0, #00ACC1)',
        'gradient-navy': 'linear-gradient(135deg, #0A1628, #0F2044)',
        'gradient-hero': 'linear-gradient(135deg, #0A1628 0%, #0F2044 50%, #0A1628 100%)',
        'grid-pattern': `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
      },
      animation: {
        'pulse-slow': 'pulse-glow 4s ease-in-out infinite',
        'blink': 'blink 2s infinite',
        'wpp-pulse': 'wpp-pulse 3s ease-in-out infinite',
        'scroll-line': 'scroll-line 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        'wpp-pulse': {
          '0%, 100%': { boxShadow: '0 8px 24px rgba(37,211,102,0.40)' },
          '50%': { boxShadow: '0 8px 40px rgba(37,211,102,0.60), 0 0 0 8px rgba(37,211,102,0.08)' },
        },
        'scroll-line': {
          '0%, 100%': { opacity: '0.4', transform: 'scaleY(1)' },
          '50%': { opacity: '1', transform: 'scaleY(1.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config
