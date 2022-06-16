import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { vueI18n } from '@intlify/vite-plugin-vue-i18n';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    deps: {
      inline: ['@vue/test-utils'],
    },
    exclude: ['**/*.spec.ts', 'node_modules'],
  },
  plugins: [
    vue(),
    vueI18n({
      include: [path.resolve(__dirname, './i18n/locales/**')],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ["vue"],
  },
})
