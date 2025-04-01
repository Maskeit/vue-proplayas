/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      scrollbar: ['rounded'],
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  safelist: [
    'text-gray-800',
    'text-gray-700',
    'dark:text-white',
    'dark:text-[var(--color-text-dark)]',    
    'opacity-0',
    'opacity-100',
    'translate-y-10',
    'translate-y-0'
  ],
  plugins: [
    require('tailwindcss-animated'),
    require('tailwind-scrollbar'),
  ],

}