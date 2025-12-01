import { defineConfig } from 'vite';
import UniPlugin from '@dcloudio/vite-plugin-uni';

const uni = typeof UniPlugin === 'function' ? UniPlugin : (UniPlugin as any).default;

export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '0.0.0')
  }
});

