import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint';

import { vueI18n } from '@intlify/vite-plugin-vue-i18n';
import path from 'path';
import ViteImages from 'vite-plugin-vue-images'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin(),
    vueI18n({
      compositionOnly: false,
      runtimeOnly: false,
      include: [path.resolve(__dirname, './src/i18n/locales/**')],
    }),
    ViteImages({
      dirs: ['src/assets/svg'],
      extensions: ['jpg', 'jpeg', 'png', 'svg', 'webp'],
      customResolvers: [],
      customSearchRegex: '([a-zA-Z0-9]+)',
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "./src/components/index.js"),
      name: "PbsDatatable",
      fileName: (format) => `pbs-datatable.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})
