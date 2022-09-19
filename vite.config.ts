import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import crossOriginIsolation from 'vite-plugin-cross-origin-isolation';
import swc from 'rollup-plugin-swc';
// Thanks to https://stackoverflow.com/a/73461731
import nodePolyfills from 'rollup-plugin-node-polyfills';

const swcPlugin = (() => {
  const plugin = (swc as any).default({
    test: 'tsx',
    jsc: {
      parser: {
        syntax: 'typescript',
        dynamicImport: true,
        decorators: true,
      },
      target: 'es2021',
      transform: {
        decoratorMetadata: true,
      },
    },
  });

  const originalTransform = plugin.transform!;

  // const transform = function (...args: Parameters<typeof originalTransform>) {
  //   if ((args[1] as string).endsWith('tsx'))
  //     return originalTransform.apply(this, args);
  // };

  const transform = function (...args: Parameters<typeof originalTransform>) {
    if (!args[1].endsWith('html')) return originalTransform.apply(this, args);
  };

  return { ...plugin, transform };
})();

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: false,
  plugins: [
    react(),
    crossOriginIsolation(),
    swcPlugin,
    nodePolyfills({ crypto: true }),
  ],
  build: {
    target: 'es2020',
    minify: false,
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  define: {
    global: 'globalThis',
    process: process,
  },
  resolve: {
    alias: {
      stream: 'rollup-plugin-node-polyfills/polyfills/stream',
      events: 'rollup-plugin-node-polyfills/polyfills/events',
      assert: 'assert',
      crypto: 'crypto-browserify',
      util: 'util',
    },
  },
});
