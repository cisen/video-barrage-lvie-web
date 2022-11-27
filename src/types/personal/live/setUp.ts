export  interface  liveInformation {
    imageUrl: string,
    interface : string, //上传接口名
    uploadUrl: string, //上传路径 
    title : string, //标题
    uploadType : string, //上传类型
    action:string,
}

export interface saveLiveDataReq {
    type : string
    title : string
    imgUrl :string
} 

export interface getLiveDataRes {
    title : string
    img :string
} 