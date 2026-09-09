/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ayur: {
          dark: '#143828',
          forest: '#1B4332',
          emerald: '#2D6A4F',
          sage: '#52B788',
          mint: '#74C69D',
          subtle: '#D8F3DC',
          cream: '#F9F8F3',
          parchment: '#F3EFE6',
          gold: '#C59B27',
          amber: '#E09F3E',
          charcoal: '#1F2937',
          slate: '#4B5563',
          border: '#E5E7EB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(27, 67, 50, 0.04), 0 1px 3px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 20px -2px rgba(27, 67, 50, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'elevated': '0 10px 25px -3px rgba(27, 67, 50, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
