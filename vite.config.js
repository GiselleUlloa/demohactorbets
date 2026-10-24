import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { createGemmaApiPlugin } from './server/gemmaApiPlugin.js';

export default defineConfig(({ mode }) => {
  // Cargamos TODAS las variables de entorno (sin prefijo VITE_) solo en el servidor Node
  // para que GEMINI_API_KEY o GITHUB_TOKEN jamás se expongan en el cliente.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      createGemmaApiPlugin(env)
    ],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/test/setup.js'
    }
  };
});
