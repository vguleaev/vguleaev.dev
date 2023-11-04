import preline from 'preline/plugin.js';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', 'node_modules/preline/dist/*.js'],
  theme: {
    extend: {},
  },
  plugins: [preline],
};
