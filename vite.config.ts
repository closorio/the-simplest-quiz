import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    outDir: 'dist',
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Apunta al servidor local
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
