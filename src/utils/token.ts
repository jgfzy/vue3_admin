//封装token数据

//存储数据
export const SET_TOKEN = (token: any) => {
  localStorage.setItem("TOKEN", token);
};
//本地存储获取数据
export const GET_TOKEN = () => {
  return localStorage.getItem("TOKEN");
};
//本地存储删除token的方法
export const REMOVE_TOKEN = () => {
  localStorage.removeItem("TOKEN");
};
