/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        candi: {
          bg: 'var(--candi-bg)',
          surface: 'var(--candi-surface)',
          elevated: 'var(--candi-elevated)',
          text: 'var(--candi-text)',
          subtle: 'var(--candi-text-subtle)',
          muted: 'var(--candi-text-muted)',
          border: 'var(--candi-border)',
          'border-strong': 'var(--candi-border-strong)',
          accent: 'var(--candi-accent)',
          'accent-subtle': 'var(--candi-accent-subtle)',
          secondary: 'var(--candi-secondary)',
          'secondary-subtle': 'var(--candi-secondary-subtle)',
          success: 'var(--candi-success)',
          warning: 'var(--candi-warning)',
          error: 'var(--candi-error)',
        }
      },
      borderRadius: {
        soft: '0.75rem',
        softer: '1rem',
      },
      boxShadow: {
        hygge: '0 2px 8px rgba(45, 50, 57, 0.06)',
        'hygge-md': '0 4px 20px rgba(45, 50, 57, 0.1)',
        'hygge-lg': '0 8px 40px rgba(45, 50, 57, 0.15)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
