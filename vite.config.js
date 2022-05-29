import { fileURLToPath, URL } from "url";

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { vueI18n } from '@intlify/vite-plugin-vue-i18n';
import path from 'path';
import ViteImages from 'vite-plugin-vue-images'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      include: [path.resolve(__dirname, './i18n/locales/**')],
    }),
    ViteImages({
      dirs: ['src/assets/svg'],
      extensions: ['jpg', 'jpeg', 'png', 'svg', 'webp'],
      customResolvers: [],
      customSearchRegex: '([a-zA-Z0-9]+)',
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL("./src", import.meta.url)),
    }
  }
})
