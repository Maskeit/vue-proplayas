/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './index.html',
      './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          // 🔹 Modo oscuro personalizado
          "dark-bg": "var(--color-dark-bg)",
          "dark-text": "var(--color-dark-text)",
          "dark-primary": "var(--color-dark-primary)",
        },
        // Personalizaciones de tema (colores, fuentes, etc.)
        fontFamily: {
          poppins: ["Poppins", "sans-serif"],
        },
      },
    },
    plugins: [
      // Aquí puedes agregar plugins adicionales si los necesitas
    ],
  }