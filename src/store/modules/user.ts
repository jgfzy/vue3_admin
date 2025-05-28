//创建用户小仓库
import { defineStore } from "pinia";
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
import { reqLogin, reqUserInfo } from "@/api/user/index";
import type { loginForm } from "@/api/user/type";
import { constantRoutes } from "@/router/routes";

let useUserStore = defineStore("UserStore", {
  //仓库
  state() {
    return {
      //存储token：使用本地存储持久化token
      token: GET_TOKEN(),
      //仓库存储菜单所需要的路由
      menuRoutes: constantRoutes,
      //存储用户名
      username: "",
      //存储用户头像图片
      avatar: "",
    };
  },
  //方法
  actions: {
    //用户点击按钮发送登录请求
    async userLogin(data: loginForm) {
      let result = await reqLogin(data);
      //如果登录成功，code为200
      if (result.code == 200) {
        //pinia仓库存储token
        this.token = result.data.token;
        //本地持久化存储一份
        SET_TOKEN(result.data.token);
        //如果登录成功返回一个成功的promise对象
        return "ok";
      } else {
        //如果失败，返回一个失败的promise对象
        return Promise.reject(new Error(result.data.message));
      }
    },
    //当首页挂载时获取用户信息的方法
    async getUserInfo() {
      //获取用户信息
      let result = await reqUserInfo();
      //根据状态码判断是否登录成功
      if (result.code == 200) {
        //登录成功后保存用户名、头像等信息
        this.username = result.data.username;
        this.avatar = result.data.avatar;
      }
    },
    //当用户点击退出登录后的方法
    userLogOut() {
      //第一件事：向服务器发送请求告诉服务器我已经退出登录[退出登录接口]，
      //当前token失效，下次登录返回需要返回新的token
      //第二件事：清空用户相关仓库中用户信息以及本地存储的token
      REMOVE_TOKEN();
      this.token = "";
      this.username = "";
      this.avatar = "";
      //第三件事：跳转到登录页面
    },
  },
  getters: {},
});
//暴露仓库
export default useUserStore;
