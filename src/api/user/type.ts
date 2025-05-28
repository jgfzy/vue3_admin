//登录接口提交数据类型
export interface loginForm {
  username: string;
  password: string;
}
interface dataType {
  message: any;
  token: any;
}
//登录接口返回数据类型
export interface loginResponseData {
  code: number;
  data: dataType;
}
//用户信息类型
interface userInfo {
  userId: number;
  avatar: string;
  username: string;
  password: string;
  desc: string;
  roles: string[];
  buttons: string[];
  routes: string[];
  token: string;
}
interface user {
  checkUser: userInfo;
}

//定义服务器返回信息相关的数据类型
export interface userResponseData {
  code: number;
  data: userInfo;
}
