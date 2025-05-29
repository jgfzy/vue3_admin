import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  //当前项目使用的插件
  plugins: [vue(), vueDevTools()],
  server: {
    //网页本地端口号
    port: 4000,
    //自动打开浏览器
    open: true,
    //是否跨域
    //cors: true,
  },
  //路径配置
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  //css配置
  css: {
    preprocessorOptions: {
      scss: {
        // 全局引入 SCSS 变量
        additionalData: `@use "@/styles/variables.scss" as *;`,
      },
    },
  },
});
