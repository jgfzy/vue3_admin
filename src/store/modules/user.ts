//创建用户小仓库
import { defineStore } from "pinia";
import { GET_TOKEN, SET_TOKEN } from "@/utils/token";
import { reqLogin } from "@/api/user/index";
import type { loginForm } from "@/api/user/type";

let useUserStore = defineStore("User", {
  //仓库
  state: () => {
    return {
      //存储token：使用本地存储持久化token
      token: GET_TOKEN(),
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
  },
  getters: {},
});
//暴露仓库
export default useUserStore;
