/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      // Here we can configure default fonts on the project. We can use this in the className of each component.
      fontFamily: {
        main: ["Montserrat"],
        alata: ["Montserrat"],
        arial: ["Arial"],
        sans: ["Arial", "Inter", "sans-serif"],
      },
      // Here we can configure the colors of the project. We can use this in the className of each component.
      colors: {
        "main-color": "#0A9EAD",
        "secondary-color": "#003454",
        "black-color": "#000000",
        "background-color": "#F5F5F5",
        "dark-color": "#0A9EAD",
        "header-color": "#FAFAFA",
        "button-color": "#003454",
        "title-color": "#6E3CD2",
        "subtitle-color": "#002751",
        "subtitle-color-qa": "#003454",
        "subtitle-color-qa-ligth": "#0d9fae",
        "paragraph-color": "#FBFBFB",
        "paragraph-light-color": "#8f8f8f",
        "instruction-dark-color": "#EC872D",
        "instruction-light-color": "#003454",
        "instruction-light-color-background": "#6DDDF7",
        "instruction-dark-color-background": "#FFEED2",
        "secondary-color-background": "#6DDDF7",
        "correct-feedback": "#4CAF50",
        "incorrect-feedback": "#F44336",
        "acordion": "#ffffff",
        "color-verde": "#17E497",
        "introduccion": "#64748b",
      },
      // Here we can configure the sizes of the project. We can use this in the className of each component.
      fontSize: {
        "title-size": "25px",
        "momento-size": "40px",
        "momento-size-mobile": "30px",
        'subtitle-size': '25px',
        "p-size": "16px",
        'instructions-size': '14px',
        'button-size': '16px',
      },
      boxShadow: {
        border: "0 0 0 2px white, 0 0 0 3.5px #6e3cd2",
      },
    },
  },
  plugins: [],
};
