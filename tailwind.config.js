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
        jakarta: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
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
        // NutriPill
        'np-primary': '#006A63',
        'np-primary-hover': '#00554F',
        'np-primary-soft': '#E5F4F2',
        'np-primary-bg': '#F3FAF9',
        'np-blue': '#1677D2',
        'np-blue-soft': '#EBF3F9',
        'np-danger': '#D94B4B',
        'np-danger-soft': '#FBEDED',
        'np-text': '#202326',
        'np-text-secondary': '#64686B',
        'np-border': '#E1E3E3',
        'np-bg': '#F8FAFA',
        'np-bg-alt': '#F2F4F4',
      },
    },
  },
  plugins: [require('flowbite/plugin'), typography],
};
