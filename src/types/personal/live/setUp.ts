import {FileUpload} from "@/types/idnex"
export  interface  liveInformation extends FileUpload{
    title : string, //标题
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