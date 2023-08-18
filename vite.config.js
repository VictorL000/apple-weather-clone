import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/apple-weather-clone/',
  plugins: [react()],
  server: {
    host: true,
  },
})
