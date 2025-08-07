/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'glow-line': 'glowLine 2.5s ease-in-out infinite',
      },
      keyframes: {
        glowLine: {
          '0%, 100%': {
            opacity: '0.4',
            filter: 'drop-shadow(0 0 4px rgba(0, 255, 255, 0.5))',
          },
          '50%': {
            opacity: '1',
            filter: 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.9))',
          },
        },
      },
    },
  },
  plugins: [],
};
