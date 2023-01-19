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

//视频信息
export interface videoInfo {
    id : number
	uid :number 
	title : string
	video : string
	cover : string
	video_duration : number
	label : Array<string>
	introduce :  string
	heat : number 
	barrageNumber : number
	username : string
    created_at : string
}

export type videoInfoList = Array<videoInfo> 
export interface getHomeInfoRes {
    rotograph: rotographList
    videoList : videoInfoList
}