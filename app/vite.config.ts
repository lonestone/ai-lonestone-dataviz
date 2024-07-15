import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import * as packageJson from './package.json'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve('src', 'components/index.ts'),
      name: 'dataviz',
      formats: ['es', 'umd'],
      fileName: (format) => `dataviz.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
});
