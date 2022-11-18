import { getuploadingMethod } from '@/apis/commonality';
export interface Result {
    code: number;
    msg: string
  }
  
  // 请求响应参数，包含data
 export interface ResultData<T = any> extends Result {
    data?: T;
}

// oss配置
export interface OssConfig {
  access_id: string
  host: string
  expire: number
  signature: string
  policy: string
  dir: string
}

