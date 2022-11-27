import httpRequest from "@/utils/requst"
import {getUploadingMethodRrq ,getUploadingMethodRrs , getOssConfigdRrq } from "@/types/commonality/commonality"

export function getOssConfig(params: getOssConfigdRrq) {
    return httpRequest.post('/commonality/ossConfig',params);
}

export function getuploadingMethod(params: getUploadingMethodRrq) {
    return httpRequest.post<getUploadingMethodRrs>('/commonality/uploadingMethod',params);
}