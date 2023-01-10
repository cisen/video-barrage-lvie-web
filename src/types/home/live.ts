import { type } from "os"

//getLiveRoom 获取直播接口请求需要
export interface getLiveRoomRes {
    address: string,
    key: string
}
  
//轮播图
export interface rotograph {
    title: string
    cover: string
    color: string
    type: string
    to_id: number
}
export type rotographList = Array<rotograph>
export interface getHomeInfoRes {
    rotograph: rotographList
}