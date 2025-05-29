//品牌管理模块的接口
import request from "@/utils/request";
//引入ts类型
import type { trademarkResponseData } from "./type";
//品牌的接口地址
enum API {
  TRADEMARK_URL = "/product/trademark",
}
//获取已有品牌接口的方法
//page:获取第几页
//limit:获取几个已有品牌的数据
export function reqProudctTrademark(page: number, limit: number) {
  return request.get<any, trademarkResponseData>(
    API.TRADEMARK_URL + `?page=${page}&limit=${limit}`,
  );
}
