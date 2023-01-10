import { getHomeInfoRes } from "@/types/home/live";
import httpRequest from "@/utils/requst"

export const getHomeInfoRequist = () => {
    return httpRequest.post<getHomeInfoRes>('/home/getHomeInfo');
}