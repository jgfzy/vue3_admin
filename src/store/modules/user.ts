//创建用户小仓库
import { defineStore } from "pinia";
//引入接口
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user/index";
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
//引入类型
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from "@/api/user/type";

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
    async userLogin(data: loginFormData) {
      let result: loginResponseData = await reqLogin(data);
      //如果登录成功,code为200
      if (result.code == 200) {
        //pinia仓库存储token
        this.token = result.data;
        //本地持久化存储一份
        SET_TOKEN(result.data);
        //如果登录成功返回一个成功的promise对象
        return "ok";
      } else {
        //如果失败,返回一个失败的promise对象
        return Promise.reject(new Error(result.data));
      }
    },
    //当首页挂载时获取用户信息的方法
    async getUserInfo() {
      //获取用户信息
      let result: userInfoResponseData = await reqUserInfo();
      //根据状态码判断是否登录成功
      if (result.code == 200) {
        //登录成功后保存用户名、头像等信息
        this.username = result.data.name;
        this.avatar = result.data.avatar;
        //获取用户信息成功
        return "ok";
      } else {
        //获取用户信息失败
        return Promise.reject(new Error(result.message));
      }
    },
    //当用户点击退出登录后的方法
    async userLogOut() {
      //第一件事：向服务器发送请求告诉服务器我已经退出登录[退出登录接口],
      let result: any = await reqLogout();
      if (result.code == 200) {
        //第二件事：清空用户相关仓库中用户信息以及本地存储的token
        //当前token失效,下次登录返回需要返回新的token
        this.token = "";
        this.username = "";
        this.avatar = "";
        REMOVE_TOKEN();
        //promise对象返回为成功状态
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }

      //第三件事：跳转到登录页面
    },
  },
  getters: {},
});
//暴露仓库
export default useUserStore;
