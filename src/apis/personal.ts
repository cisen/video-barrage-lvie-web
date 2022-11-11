import httpRequest from "@/utils/requst"

import {UserInfoRes ,determineNameExistsRes,determineNameExistsReq,setUserInfoRes} from "@/types/personal/userInfo/userInfo"

export const getUserInfoRequist = () => {
    return httpRequest.post<UserInfoRes>('/user/getUserInfo');
}

export const determineNameExistsRequist = (params : determineNameExistsReq) => {
    return httpRequest.post<determineNameExistsRes>('/user/determineNameExists',params);

}

export const setUserInfoRequist = (params: UserInfoRes) => {
    return httpRequest.post<setUserInfoRes>('/user/setUserInfo',params);
}