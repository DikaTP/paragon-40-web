/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#486E98",
        secondary: {
          50: '#F3DCEC',
          100: '#c4aaff',
          200: '#8855ff',
          300: '#4d00ff',
          400: '#3c00c6',
        },
        brandorange: "#fe9f33"
      },
    },
  },
  plugins: [],
};
