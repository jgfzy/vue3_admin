import { createApp } from "vue";
//引入App组件
import App from "@/App.vue";
//引入全局el-icon
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
//引入element-plus组件
import ElementPlus from "element-plus";
//引入element-plus样式
import "element-plus/dist/index.css";
//引入element-plus国际化
import zhCn from "element-plus/es/locale/lang/zh-cn";
//引入全局scss样式
import "@/styles/index.scss";
//引入路由
import router from "./router/index.ts";
//引入pinia
import pinia from "@/store/index.ts";
//创建app实例
const app = createApp(App);
//注册全局el-icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
//使用插件，配置中文语言
app.use(ElementPlus, {
  locale: zhCn,
});
//注册路由
app.use(router);
//注册pinia
app.use(pinia);
//挂载app
app.mount("#app");
