/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'purple600': '#805AD5',
      'purple700': '#6B46C1',
      'dirtywhite': '#e7e5e4',
      'tahiti': '#ffffff',
      'gray': '#1f2937',
      'dark': '#000000',
      'dark-blue': '#00008B',
      'menuitemcolor': '#FCB900',
      'addtocartcolor': "#FFA500",
      'minicolor': "#e7e3e0",
      'mlue': "#0096FF",
      'green': "#43A047",
      'red': '#e53e3e',
      
    },
    extend: {},
  },
  plugins: [],
}
