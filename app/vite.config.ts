import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/ 
export default defineConfig({
  base: '/',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    allowedHosts: ['unfound-clayton-felicitously.ngrok-free.app'], // nota: .app non .dev
  },
  // AGGIUNGI QUESTO per Vercel:
  preview: {
    port: 4173,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})