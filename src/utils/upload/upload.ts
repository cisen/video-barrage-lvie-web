import { ossUpload } from "./oss"
import { localUpload } from "./local";
import { FileUpload } from "@/types/idnex"
import { UploadRawFile } from "element-plus";
export const uploadFile = (config: FileUpload, rawFile: File): Promise<{ path: string }> => {
    let res
    switch (config.uploadType) {
        case "aliyunOss":
            res = ossUpload(rawFile, config)
            break;
        case "local":
            res = localUpload(rawFile, config)
            break;
    }

    return res as Promise<{ path: string }>
}