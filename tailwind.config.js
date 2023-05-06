/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        trianglify: "url('/images/trianglify.png')",
      },
      // MILKY GREEN:
      // colors: {
      //   brand: "#22C55E",
      //   darkest: "#0F172A",
      //   dark: "#27375E",
      //   mid: "#ABB8C9",
      //   light: "#E1E6EB",
      //   lightest: "#F5F5F5",
      // },
      // ALIEN INVASION
      // colors: {
      //   brand: "#59E881",
      //   darkest: "#262335",
      //   dark: "#433E5A",
      //   mid: "#6D59C0",
      //   light: "#DDDAE8",
      //   lightest: "#FFFFFF",
      // },
      // MY CUSTOM
      colors: {
        // brand: "#59E881", //Alien invasion
        brand: "#6EE7B7", //Toothpaste
        darkest: "#0f131a",
        darker: "#131c27",
        // darkest: "#131c27",
        // darker: "#0D111F",
        dark: "#433E5A",
        mid: "#6D59C0",
        light: "#DDDAE8",
        lighter: "#F5F5F5",
        lightest: "#FFFFFF",
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/line-clamp")],
};
