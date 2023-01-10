import { FileUpload } from "@/types/idnex"
import { Ref } from "vue"
//form 表单结构
export interface vdeoContributionForm {
    isShow: boolean,
    title: string,
    type: boolean,
    timing: boolean,
    date1time: string,
    labelInputVisible: boolean,
    labelText: string,
    label: Array<string>,
    introduce: string,
    videoDuration : number
}
//upload
export interface uploadFileformation extends FileUpload {

}

//api createVideoContribution 需要结构
export interface createVideoContributionReq {
    video: string,
    videoUploadType: string,
    cover: string,
    coverUploadType: string,
    title: string,
    reprinted: boolean,
    timing: boolean,
    timingTime?: string,
    label:  Array<string>,
    introduce: string,
    videoDuration : number
}