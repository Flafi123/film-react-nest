import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['src/scss']
      }
    }
  },
  server: {
    proxy: {
      // 1. Прокси для запросов к данным (запросы к фильмам, сеансам и т.д.)
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      // 2. Прокси для статики (чтобы отображались постеры и картинки фильмов)
      '/content': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})