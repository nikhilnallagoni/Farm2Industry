module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      lexend: ["Lexend", "sans-serif"],
    },
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".hide-scrollbar": {
          "-ms-overflow-style": "none", // Internet Explorer 10+
          "scrollbar-width": "none", // Firefox
        },
        ".hide-scrollbar::-webkit-scrollbar": {
          display: "none", // Safari and Chrome
        },
      });
    },
  ],
};
