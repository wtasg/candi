import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.NODE_ENV === 'production' ? '/candi/' : '/',
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
})
