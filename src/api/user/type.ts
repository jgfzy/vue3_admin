//定义用户相关数据类型
//用户登录接口请求携带的数据类型
export interface loginFormData {
  username: string;
  password: string;
}
//定义所有响应都会有的类型
export interface responseData {
  code: number;
  message: string;
  ok: boolean;
}
//定义登录接口返回数据类型
export interface loginResponseData extends responseData {
  data: string;
}
//定义获取用户信息返回的数据类型
export interface userInfoResponseData extends responseData {
  data: {
    routes: string[];
    button: string[];
    roles: string[];
    name: string;
    avatar: string;
  };
}
