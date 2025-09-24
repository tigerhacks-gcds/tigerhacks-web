import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set base for GitHub Pages when deploying to user/repo subpath
  base: process.env.BASE_PATH || '/',
})
