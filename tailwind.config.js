/** @type {import('tailwindcss').Config} */
const typography = require('@tailwindcss/typography');

module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx,css}',
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {
      scrollBehavior: {
        smooth: 'smooth',
      },
      fontFamily: { 
        primary: ['Ubuntu', 'sans-serif'],
        secondary: ['Barlow', 'sans-serif'],
        main: ['ClashGrotesk', 'sans-serif'],

      },
      colors: {
        primary: '#7b4d9f',
        secondary: '#f8c100',
        accent: '#67648a',
        background: '#f5f5f5',
        text: '#333333',
        textSecondary: '#666666',
        border: '#e0e0e0',
        borderSecondary: '#cccccc',
        // Colores para productos digitales (azul)
        'blue-primary': '#1e40af',
        'blue-secondary': '#3b82f6',
        'blue-accent': '#60a5fa',
        'blue-light': '#dbeafe',
        'blue-dark': '#1e3a8a',
      }
    },
  },
  plugins: [require('flowbite/plugin'), typography],
};
