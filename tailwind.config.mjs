/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        accent: '#E10600',
      },
      fontFamily: {
        heading: ['Khand', 'sans-serif'],
        body: ['Switzer', 'sans-serif'],
      },
      maxWidth: {
        content: '960px',
      },
    },
  },
  plugins: [],
};
