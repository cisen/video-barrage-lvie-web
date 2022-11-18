export  interface  liveInformation {
    imageUrl: string,
    uploadUrl: string, //上传路径 
    title : string, //标题
    uploadType : string, //上传类型
    headers?: {
        token : string
    },
    data? : object,
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