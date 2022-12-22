import { AreateArticleContributionReq, GetArticleContributionListByUserReq } from "@/types/creation/contribute/contributePage/articleContribution";
import { createVideoContributionReq } from "@/types/creation/contribute/contributePage/vdeoContribution";
import { ArticlePostCommentReq, GetArticleCommentReq, GetArticleCommentRes, GetArticleContributionByIDReq, GetArticleContributionByIDRes } from "@/types/creationShow/article/article";
import { GetArticleContributionListByUserRes } from "@/types/live/liveRoom";
import httpRequest from "@/utils/requst"


//发布视频
export const createVideoContribution = (params: createVideoContributionReq) => {
    return httpRequest.post('/contribution/createVideoContribution', params);
}

//发布专栏
export const createArticleContribution = (params: AreateArticleContributionReq) => {
    return httpRequest.post('/contribution/createArticleContribution', params);
}


//根据用户获取专栏信息
export const getArticleContributionListByUser = (params: GetArticleContributionListByUserReq) => {
    return httpRequest.post<GetArticleContributionListByUserRes>('/contribution/getArticleContributionListByUser', params);
}

//根据文章ID获取文章信息
export const getArticleContributionByID = (params: GetArticleContributionByIDReq) => {
    return httpRequest.post<GetArticleContributionByIDRes>('/contribution/getArticleContributionByID', params);
}

//文章发布评论
export const articlePostComment = (params: ArticlePostCommentReq) => {
    return httpRequest.post('/contribution/articlePostComment', params);
}

//单独获取文章评论
export const getArticleComment = (params: GetArticleCommentReq) => {
    return httpRequest.post<GetArticleCommentRes>('/contribution/getArticleComment', params);
}