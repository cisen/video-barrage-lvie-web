import httpRequest from "@/utils/requst"

import {UserInfoRes ,determineNameExistsRes,determineNameExistsReq,setUserInfoRes,updateAvatarReq} from "@/types/personal/userInfo/userInfo"
import {saveLiveDataReq,getLiveDataRes} from "@/types/personal/live/setUp"

export const getUserInfoRequist = () => {
    return httpRequest.post<UserInfoRes>('/user/getUserInfo');
}

export const determineNameExistsRequist = (params : determineNameExistsReq) => {
    return httpRequest.post<determineNameExistsRes>('/user/determineNameExists',params);

}

export const setUserInfoRequist = (params: UserInfoRes) => {
    return httpRequest.post<setUserInfoRes>('/user/setUserInfo',params);
}

export const updateAvatarRequist = (params: updateAvatarReq) => {
    return httpRequest.post('/user/updateAvatar',params);
}

export const getLiveDataRequist = () => {
    return httpRequest.post<getLiveDataRes>('/user/getLiveData');
}

export const saveLiveDataRequist = (params: saveLiveDataReq) => {
    return httpRequest.post('/user/saveLiveData',params);
}

export const uploadFile = (params: any) => {
    return httpRequest.upload('/user/upload',params);
}


