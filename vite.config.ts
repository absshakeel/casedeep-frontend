import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
  },
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://casedeep.com:8080',
        changeOrigin: true,
        secure: false,
      },
      '/ws': {
        target: 'http://casedeep.com:8080',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  }
})