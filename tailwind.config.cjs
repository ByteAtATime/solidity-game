/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        choice: "#66e46b",
      },
    },
  },

  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "base-100": "black",
        },
      },
    ], // we don't include light because we don't really have "themes"
  },
};

module.exports = config;
