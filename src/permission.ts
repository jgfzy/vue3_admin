//路由鉴权，设置某一个路由什么条件下可以访问，什么条件下不可以访问的设置

//引入路由
import router from "@/router";
//引入进度条插件
import nprogress from "nprogress";
//引入进度条样式
import "nprogress/nprogress.css";
//全局守卫：项目中任意路由切换都会触发的钩子
//全局前置守卫：访问某一个路由之前触发的钩子
router.beforeEach((to, from, next) => {
  //to；你将要访问哪一个路由
  //from；你从哪个路由来
  //next()；路由放行

  //进度条开始
  nprogress.start();
  next();
});
//全局后置守卫：访问某一个路由之后触发的钩子
router.afterEach((to, from) => {
  //进度条结束
  nprogress.done();
});
