import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/counter': {
        target: 'https://api.counterapi.dev/v2/dubbing-babas-team-5110/first-counter-5110',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/counter/, ''),
        headers: {
          'Authorization': 'Bearer ut_B1Yv8O7LP1fMRixdT62QHvyFjydjsOl8JSxv5db9',
        },
      },
    },
  },
})

