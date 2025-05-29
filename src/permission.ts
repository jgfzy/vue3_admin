//路由鉴权，设置某一个路由什么条件下可以访问，什么条件下不可以访问的设置

//引入路由
import router from "@/router";
//引入用户相关仓库获取token数据判断用户是否登录
import pinia from "./store";
import useUserStore from "./store/modules/user";
//引入全局页面设置
import settings from "./settings";
//引入进度条插件
import nprogress from "nprogress";
//引入进度条样式
import "nprogress/nprogress.css";
//删除加载提示
nprogress.configure({ showSpinner: false });
//获取用户数据
let UserStore = useUserStore(pinia);

//全局守卫：项目中任意路由切换都会触发的钩子
//全局前置守卫：访问某一个路由之前触发的钩子
router.beforeEach(async (to, from, next) => {
  //to；你将要访问哪一个路由
  //from；你从哪个路由来
  //next()；路由放行

  //进度条开始
  nprogress.start();
  //获取token判断用户是否登录
  let token = UserStore.token;
  //获取用户信息
  let username = UserStore.username;
  //判断是否登陆成功
  if (token) {
    //判断为用户登录成功
    //登录成功后，如果想去的路径为登录页，则指向首页
    if (to.path == "/login") {
      next({ path: "/" });
    } else {
      //登录成功后，访问其他路由，放行
      //访问其他路由时，如果带有用户信息，放行
      if (username) {
        next();
      } else {
        //访问其他路由时，用户信息丢失，则发送请求获取用户信息，然后放行
        try {
          //获取用户信息成功，则放行
          await UserStore.getUserInfo();
          next();
        } catch (error) {
          //获取用户信息失败，说明token过期或用户手动修改本地token
          //此时应退出登录，清除token以及用户相关信息
          await UserStore.userLogOut();
          //退出登录以后，指向登录页进行重新登录
          next({
            path: "/login",
            query: {
              redirect: to.path,
            },
          });
        }
      }
    }
  } else {
    //判断为用户未登录
    //用户未登录，如果想去的路径是登录页，放行
    if (to.path == "/login") {
      next();
    } else {
      //用户未登录，如果想去的路径是其他页面，则重定向到登录页
      next({ path: "/login", query: { redirect: to.path } });
    }
  }
  //next();
});
//全局后置守卫：访问某一个路由之后触发的钩子
router.afterEach((to, from) => {
  document.title = settings.logoTitle + " - " + to.meta.title;
  //进度条结束
  nprogress.done();
});
