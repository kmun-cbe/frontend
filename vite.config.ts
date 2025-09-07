import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file from frontend directory
  const env = loadEnv(mode, './', '');
  
  return {
    plugins: [react()],
    base: '/', // Set base path for deployment
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    build: {
      assetsDir: 'assets',
      // Public assets (from public/ folder) are automatically copied to dist root
      // Only imported assets (like import logo from './logo.png') go to assets/ folder
    },
    publicDir: 'public',
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});