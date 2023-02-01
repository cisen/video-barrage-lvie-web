export interface GetVideoContributionByIDReq {
    video_id: number
}

export interface GetVideoContributionByIDRes {
    videoInfo : vInfo
    recommendList : recommendList
}

interface creatorInfo {
    username: string
    avatar: string
    signature: string
}

export interface VideoInfo{
    videoInfo :vInfo
    recommendList : recommendList
    barrageList : getVideoBarrageListRes
}

export interface vInfo {
    id: number
    uid: number
    title: string
    video: string
    cover: string
    video_duration: number
    label: Array<string>
    introduce: string
    heat: number
    barrageNumber: number
    creatorInfo: creatorInfo
    created_at: string
}

export interface  recommendViodeInfo {
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

export type recommendList = Array<recommendViodeInfo> 


export interface getVideoBarrageListReq {
    id : string
}

export interface getVideoBarrageListRes {
    time : number
    text : string
    sendTime : string
}


export interface sendVideoBarrageReq {
    author : string
	color : number
	id : string
	text :  string
	time  : number
	type : number
	token : string
}