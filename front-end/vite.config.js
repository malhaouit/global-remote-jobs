import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000,  // Use Heroku's PORT or default to 3000 locally
    strictPort: true,  // Ensure Vite fails if it can't bind to the correct port
  },
  preview: {
    port: process.env.PORT || 3000,
    strictPort: true,
  },
});