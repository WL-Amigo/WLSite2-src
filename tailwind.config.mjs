import Colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: Colors.blue,
        secondary: Colors.gray,
      },
    },
  },
  plugins: [],
  safelist: ["h-6", "w-6"],
};
