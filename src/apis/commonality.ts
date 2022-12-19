import httpRequest from "@/utils/requst"
import {getUploadingMethodRrq ,getUploadingMethodRrs , getOssConfigdRrq, getFullPathOfImageRrq } from "@/types/commonality/commonality"

export function getOssConfig(params: getOssConfigdRrq) {
    return httpRequest.post('/commonality/ossConfig',params);
}

export function getuploadingMethod(params: getUploadingMethodRrq) {
    return httpRequest.post<getUploadingMethodRrs>('/commonality/uploadingMethod',params);
}

export function getFullPathOfImage(params: getFullPathOfImageRrq) {
    return httpRequest.post<string>('/commonality/getFullPathOfImage',params);
}