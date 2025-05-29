//用户相关接口
import request from "@/utils/request";
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from "./type";
//统一管理接口
enum API {
  LOGIN_URL = "/user/login",
  USERINFO_URL = "/user/info",
  LOGOUT_URL = "/user/logout",
}

//post登录请求
export function reqLogin(data: loginFormData) {
  return request.post<any, loginResponseData>(API.LOGIN_URL, data);
}
//get用户信息请求
export function reqUserInfo(): any {
  return request.get<any, userInfoResponseData>(API.USERINFO_URL);
}
//post退出登录请求
export function reqLogout() {
  return request.post<any, any>(API.LOGOUT_URL);
}
