import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Prioritize TypeScript files to resolve module conflicts
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.mjs'],
    alias: {
      // Fix: Replace `__dirname` with `process.cwd()` to be compatible with ES modules where `__dirname` is not defined.
      '@': path.resolve(process.cwd(), './'),
    },
  }
})
