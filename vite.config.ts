/// <reference types="vitest" />
import {defineConfig, transformWithEsbuild} from 'vite';

import angular from '@analogjs/vite-plugin-angular';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({mode}) => ({
  ssr: {
    noExternal: [/fesm2022/]
  },  
  plugins: [
    angular(),
    viteTsConfigPaths({
      root: './',
    }),
    {
      name: 'test',
      async transform(_code, id) {
        if (/fesm2022/.test(id)) {
          const { code, map } = await transformWithEsbuild(_code, id, {
            loader: 'js',
            format: 'esm',
            target: 'es2016',
            sourcemap: true,
            sourcefile: id,
          });
    
          return {
            code,
            map,
          };       
       }

      return undefined;
      }
    }    
  ],
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage'
    },
    globals: true,
    setupFiles: ['src/test.ts'],
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
