//用户相关接口
import request from "@/utils/request";
import type { loginForm, loginResponseData, userResponseData } from "./type";
//统一管理接口
enum API {
  LOGIN_URL = "user/login",
  USERINFO_URL = "user/info",
}

//登录函数
export function reqLogin(data: loginForm) {
  return request.post<any, loginResponseData>(API.LOGIN_URL, data);
}
//用户信息函数
export function reqUserInfo(params?: any) {
  return request.get<userResponseData>(API.USERINFO_URL, { params: params });
}
