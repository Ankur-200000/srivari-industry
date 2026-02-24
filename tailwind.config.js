/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html', /* This now watches index.html, 404.html, and any future html files */
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}