import { ossUpload } from "./oss"
import { localUpload } from "./local";
import { UploadRawFile } from "element-plus";
export const uploadFile = (type: string, rawFile: File) : Promise<{path : string }> => {
    let res 
    switch (type) {
        case "aliyunOss":
            res =  ossUpload(rawFile)
            break;
        case "local":
            res =  localUpload(rawFile)
            break;
    }

    return res as Promise<{path : string }>
}