import {FileUpload} from "@/types/idnex"
export  interface vdeoContributionForm {
    isShow : boolean , 
    title: string,
    type: string,
    timing : boolean,
    date1: string,
    date2: string,
    label : string,
    introduce: string,
}

export  interface  uploadFileformation extends FileUpload{

}