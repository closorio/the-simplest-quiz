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
      },
    },
    plugins: [],
  }