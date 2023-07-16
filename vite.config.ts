import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv, type UserConfigExport } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig(({ mode }) => {
  const defaultConfig: UserConfigExport = {
    plugins: [sveltekit()]    
  };

  if (mode === 'development') {
    process.env = {...process.env, ...loadEnv(mode, process.cwd(), '')};
    defaultConfig.server = {
      https: true,
      proxy: {}
    }
    defaultConfig.plugins?.push(basicSsl());
  }

  return defaultConfig;
});
