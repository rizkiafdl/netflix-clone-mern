/** @type {import('tailwindcss').Config} */
export default {
  //merubah di area content copas dari tailwind website
  //masukin daisyUI di plugin
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}

