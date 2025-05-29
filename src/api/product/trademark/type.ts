export interface responseData {
  code: number;
  message: string;
  ok: boolean;
}
//已有品牌的数据类型
export interface trademark {
  id?: number;
  tmName: string;
  logoUrl: string;
}
//返回的记录包含请求到的每个品牌
export type records = trademark[];

//获取已有的全部品牌的数据类型
export interface trademarkResponseData extends responseData {
  data: {
    records: records;
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}
