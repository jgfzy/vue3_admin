//品牌管理模块的接口
import request from "@/utils/request";
//引入ts类型
import type { trademarkResponseData, trademark } from "./type";
//品牌的接口地址
enum API {
  //获取已有品牌的接口
  TRADEMARK_URL = "/product/trademark",
  //添加品牌的接口
  ADDTRADEMARK_URL = "/product/trademark/save",
  //修改品牌的接口
  UPDATETRADEMARK_URL = "/product/trademark/update",
}
//获取已有品牌接口的方法
//page:获取第几页
//limit:获取几个已有品牌的数据
export function reqProudctTrademark(page: number, limit: number) {
  return request.get<any, trademarkResponseData>(
    API.TRADEMARK_URL + `?page=${page}&limit=${limit}`,
  );
}
export function reqAddOrUpdateTrademark(data: trademark) {
  //如果数据有id,那就是修改品牌的数据
  if (data.id) {
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data);
  } else {
    //添加品牌
    return request.post<any, any>(API.ADDTRADEMARK_URL, data);
  }
}
