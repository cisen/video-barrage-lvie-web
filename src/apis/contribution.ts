import { createArticleContributionReq, GetArticleContributionListByUserReq } from "@/types/creation/contribute/contributePage/articleContribution";
import { createVideoContributionReq } from "@/types/creation/contribute/contributePage/vdeoContribution";
import { GetArticleContributionByIDReq, GetArticleContributionByIDRes } from "@/types/creationShow/article/article";
import { GetArticleContributionListByUserRes } from "@/types/live/liveRoom";
import httpRequest from "@/utils/requst"


//发布视频
export const createVideoContribution = (params: createVideoContributionReq) => {
    return httpRequest.post('/contribution/createVideoContribution', params);
}

//发布专栏
export const createArticleContribution = (params: createArticleContributionReq) => {
    return httpRequest.post('/contribution/createArticleContribution', params);
}


//根据用户获取专栏信息
export const getArticleContributionListByUser = (params: GetArticleContributionListByUserReq) => {
    return httpRequest.post<GetArticleContributionListByUserRes>('/contribution/GetArticleContributionListByUser', params);
}

//根据文章ID获取文章信息
export const GetArticleContributionByID = (params: GetArticleContributionByIDReq) => {
    return httpRequest.post<GetArticleContributionByIDRes>('/contribution/GetArticleContributionByID', params);
}