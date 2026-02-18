import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  main: {},
  preload: {},
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@assets': resolve('src/renderer/src/assets'),
        '@components': resolve('src/renderer/src/components'),
        '@store': resolve('src/renderer/src/store'),
        '@utils': resolve('src/renderer/src/utils'),
        '@router': resolve('src/renderer/src/router'),
        '@api': resolve('src/renderer/src/api'),
        '@interface': resolve('src/renderer/src/interface'),
        '@views': resolve('src/renderer/src/views'),
        '@hooks': resolve('src/renderer/src/hooks'),
        '@layout': resolve('src/renderer/src/layout'),
        '@plugins': resolve('src/renderer/src/plugins'),
        '@locales': resolve('src/renderer/src/locales'),
        '@directives': resolve('src/renderer/src/directives'),
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    server: {
      "proxy": {
        "/api": {
          "target": 'http://uat.crm.xuexiluxian.cn',
          "changeOrigin": true,
          "rewrite": (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
