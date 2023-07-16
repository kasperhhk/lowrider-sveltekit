import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  
  if (mode === 'development') {
    process.env = {...process.env, ...loadEnv(mode, process.cwd(), '')};
  }

  return {
    plugins: [sveltekit()]    
  };
});
