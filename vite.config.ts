import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { viteMockServe } from 'vite-plugin-mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { PlusProComponentsResolver } from '@plus-pro-components/resolver'

export default defineConfig((config) => {
  const { command, mode } = config
  const env = loadEnv(mode, process.cwd())

  return {
    base: './',
    plugins: [
      vue(),
      viteMockServe({
        // 只在开发阶段开启 mock 服务,mock和后端服务器接口能共存，可以通过配置来区分
        localEnabled: command === 'serve',
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver(), PlusProComponentsResolver()],
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      // * vite 可以使用 jsx/tsx 语法
      vueJsx(),
      // * name 可以写在 script 标签上
      VueSetupExtend(),
      // * vite-svg-loader支持，可以直接引入svg图标当作组件使用
      svgLoader(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    server: {
      // host: 'localhost',
      /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
      host: true,
      port: Number(env.VITE_APP_PORT),
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: 'https://mock.apifox.cn/m1/2979784-0-default',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev-api/, ''),
        },

        '/mgtvOss': {
          target: env.VITE_OSS_PROXY_PATH,
          changeOrigin: true,
          secure: false, //能够接收无效证书的https
          rewrite: (path) => path.replace(/^\/mgtvOss/, '/mgtvOss'),
        },
      },
    },
  }
})
