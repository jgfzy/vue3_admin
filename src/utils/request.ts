//axios二次封装，设置基础默认配置
import axios from "axios";
import { ElMessage } from "element-plus";

let request = axios.create({
  //基础路径
  baseURL: "http://127.0.0.1:3000",
  timeout: 5000,
});
//添加请求拦截器
request.interceptors.request.use((config) => {
  //返回配置对象
  return config;
});
//添加响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    //定义一个变量，存储错误信息
    let message = "";

    // 检查 error.response 是否存在
    if (error.response) {
      // 获取错误状态码
      let status = error.response.status;
      switch (status) {
        case 401:
          message = "TOKEN过期";
          break;
        case 403:
          message = "无权访问";
          break;
        case 404:
          message = "请求地址错误";
          break;
        default:
          message = `未知错误：${status}`;
          break;
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      message = "请求已发出但没有收到响应";
    } else {
      // 其他错误
      message = `请求发生错误: ${error.message}`;
    }
    //使用组件提示错误信息
    ElMessage: ({
      type: "error",
      message,
    });
    return Promise.reject(error);
  },
);
//对外暴露
export default request;
