import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/v1': {
        target: 'http://localhost:3000', // Backend server URL
        changeOrigin: true,            // Needed for virtual hosted sites
        secure: false,                 // If using https and you have self-signed certificates
      },
    },
  },
})
