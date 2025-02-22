// tailwind.config.js
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          'finger-paint': ['"Finger Paint"', 'regular'],
        },
        fontSize: {
          'xxs': '0.65rem',
          'xxl': '1.75rem',
        },
        dropShadow: {
          '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
          '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)'
          ],
        },
      },
    },
    plugins: [],
  }