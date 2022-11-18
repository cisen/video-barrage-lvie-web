import httpRequest from "@/utils/requst"
import {getUploadingMethodRrq ,getUploadingMethodRrs } from "@/types/commonality/commonality"

export function getOssConfig() {
    return httpRequest.post('/commonality/ossConfig');
}

export function getuploadingMethod(params: getUploadingMethodRrq) {
    return httpRequest.post<getUploadingMethodRrs>('/commonality/uploadingMethod',params);
}