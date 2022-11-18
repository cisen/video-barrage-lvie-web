import { OssConfig } from './../idnex';

export interface userInfo {
    id : number
    photo : string
    token : string
    userName : string
    liveData : {
        address :string
        key : string 
    }
}

export interface global {
    router:{
        currentRouter : string
    }
    loading :  {
        loading :boolean
        loadingText? : string
        loadingBackground ?: string
        loadingSvg ?: string
        loadingSvgViewBox ?: string
    }
    oss : OssConfig
}