import httpRequest from "@/utils/requst"

import {getLiveRoomRes} from "@/types/home/live"


export const getLiveRoom = () => {

    return httpRequest.post<getLiveRoomRes>('/live/getLiveRoom');
    
}