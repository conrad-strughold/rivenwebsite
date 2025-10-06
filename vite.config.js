import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',   // REQUIRED for GitHub Pages (project site)
  build: { outDir: 'docs' }, // Build into /docs so Pages can serve from main/docs
})