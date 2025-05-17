import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    include: '**/*.{js,jsx}' // Обрабатывать оба расширения
  })],
  base:`/Market-API-React/`,
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
