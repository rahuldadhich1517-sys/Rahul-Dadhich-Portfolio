/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/styles/**/*.css",
    "./src/components/**/*.{jsx,tsx}"
  ],
  theme: {
    screens: {
      'mobile': '480px',
      'tablet': '768px',
      'laptop': '1024px',
      'desktop': '1280px',
      'wide': '1440px',
      'ultrawide': '1920px',
    },
    extend: {
      colors: {
        // Newsprint Single Palette - Light Mode
        'bg-primary': '#F9F9F7',       /* Newsprint Off-White */
        'bg-secondary': '#FFFFFF',     /* White */
        'bg-surface': '#F5F5F5',       /* Hover backgrounds */
        'bg-card': '#FFFFFF',          /* Card backgrounds */

        'text-primary': '#111111',     /* Ink Black - all text */
        'text-secondary': '#E5E5E0',   /* Divider Grey - secondary */
        'text-muted': '#737373',       /* Metadata, captions */
        'text-inverse': '#F9F9F7',     /* White on inverted sections */

        'border-primary': '#111111',   /* Ink Black - primary structural element */
        'border-strong': '#111111',    /* 4px for major dividers */
        'border-subtle': '#E5E5E0',    /* Subtle dividers */

        'accent': '#CC0000',           /* Editorial Red - sparing use */
      },
      fontFamily: {
        serif: ['Playfair Display', 'Times New Roman', 'serif'],
        body: ['Lora', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'SF Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)', { lineHeight: '1.625', letterSpacing: '0.02em' }],
        'sm': ['clamp(0.875rem, 0.8125rem + 0.3125vw, 1rem)', { lineHeight: '1.625', letterSpacing: '0' }],
        'base': ['clamp(1rem, 0.9375rem + 0.3125vw, 1.125rem)', { lineHeight: '1.625', letterSpacing: '0' }],
        'lg': ['clamp(1.125rem, 1.0625rem + 0.3125vw, 1.25rem)', { lineHeight: '1.5', letterSpacing: '-0.02em' }],
        'xl': ['clamp(1.25rem, 1.125rem + 0.5vw, 1.5rem)', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
        '2xl': ['clamp(1.5rem, 1.25rem + 1vw, 2rem)', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        '3xl': ['clamp(2rem, 1.5rem + 1.5vw, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        '4xl': ['clamp(2.5rem, 2rem + 2vw, 4rem)', { lineHeight: '1.2', letterSpacing: '-0.03em' }],
        '5xl': ['clamp(3.5rem, 2.5rem + 4vw, 6rem)', { lineHeight: '1', letterSpacing: 'tracking-tighter' }],
        '6xl': ['clamp(4.5rem, 3.5rem + 4vw, 8rem)', { lineHeight: '1', letterSpacing: 'tracking-tighter' }],
        '7xl': ['clamp(6rem, 4.5rem + 5vw, 10rem)', { lineHeight: '1', letterSpacing: 'tracking-tighter' }],
        '9xl': ['clamp(8rem, 6rem + 6vw, 12rem)', { lineHeight: '0.9', letterSpacing: 'tracking-tighter' }],
      },
      spacing: {
        '0': '0',
        '1': '0.25rem',   /* 4px */
        '2': '0.5rem',    /* 8px */
        '3': '0.75rem',   /* 12px */
        '4': '1rem',      /* 16px */
        '5': '1.25rem',   /* 20px */
        '6': '1.5rem',    /* 24px */
        '8': '2rem',      /* 32px */
        '10': '2.5rem',   /* 40px */
        '12': '3rem',     /* 48px */
        '16': '4rem',     /* 64px */
        '20': '5rem',     /* 80px */
        '24': '6rem',     /* 96px */
        '32': '8rem',     /* 128px */
      },
      borderRadius: {
        'none': '0',
      },
      boxShadow: {
        // No soft shadows - only hard offset shadow for hover
        'none': '0 0 0 transparent',
      },
      transitionDuration: {
        'instant': '0ms',
        'fast': '150ms',
        'normal': '200ms',
        'slow': '300ms',
      },
      transitionTimingFunction: {
        'linear': 'linear',
        'out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      zIndex: {
        'base': '0',
        'sticky': '40',
        'fixed': '50',
        'modal': '600',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2rem',
          '2xl': '2.5rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1440px',
        },
      },
    },
    plugins: [],
  },
}