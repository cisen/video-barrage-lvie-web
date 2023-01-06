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


// 文件上传配置必须
export interface FileUpload {
  progress: number, //上传进度
  FileUrl: string, //返回文件路径
  interface: string, //上传接口名
  uploadUrl: string, //上传路径 
  uploadType: string, //上传类型
  action: string, //请求地址
}

//分页配置
export interface PageInfo {
  page   : number   // 页码
	size : number // 每页大小
	keyword  ?: string //关键字
}