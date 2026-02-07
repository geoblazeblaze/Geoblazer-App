
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Replace 'Geoblazer-App' with your actual repository name if it differs
export default defineConfig({
  plugins: [react()],
  base: '/Geoblazer-App/',
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.VITE_API_KEY)
  }
});
