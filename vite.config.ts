// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

// Obtén __dirname en un entorno ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@view': path.resolve(__dirname, './src/views'),
      '@components': path.resolve(__dirname, './src/components'),
      '@layout': path.resolve(__dirname, './src/layouts'),
      '@interfaces': path.resolve(__dirname, './src/interfaces'),
      '@service': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/stores'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@api' : path.resolve(__dirname, './src/api/axiosInstance.ts'),
      '@icons' : path.resolve(__dirname, './src/components/icons'),
      '@stores' : path.resolve(__dirname, './src/services/Stores'),
      '@utils' : path.resolve(__dirname, './src/utils'),
    },
  },
  logLevel: "info", // 🔹 Esto mostrará más detalles sobre los errores en la consola
})