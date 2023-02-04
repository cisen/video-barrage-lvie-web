import { AreateArticleContributionReq, GetArticleContributionListByUserReq } from "@/types/creation/contribute/contributePage/articleContribution";
import { createVideoContributionReq } from "@/types/creation/contribute/contributePage/vdeoContribution";
import { ArticlePostCommentReq, GetArticleCommentReq, GetArticleCommentRes, GetArticleContributionByIDReq, GetArticleContributionByIDRes } from "@/types/creationShow/article/article";
import { GetVideoContributionByIDReq, GetVideoContributionByIDRes, VideoPostCommentReq, GetVideoBarrageListReq, GetVideoBarrageListRes, SendVideoBarrageReq, GetVideoCommentReq, GetVideoCommentRes } from "@/types/creationShow/video/video";
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

//根据id获取视频信息
export const getVideoContributionByID = (params: GetVideoContributionByIDReq) => {
    return httpRequest.post<GetVideoContributionByIDRes>('/contribution/getVideoContributionByID', params);
}

export const danmakuApi = import.meta.env.VITE_BASE_URL + '/contribution/video/barrage/'

//获取视弹幕列表
export const getVideoBarrageList = (params: GetVideoBarrageListReq) => {
    return httpRequest.get<GetVideoBarrageListRes>('/contribution/getVideoBarrageList', params);
}

//获取视弹幕列表
export const sendVideoBarrage = (params: SendVideoBarrageReq) => {
    return httpRequest.post('/contribution/video/barrage/v3/', params);
}

//文章发布评论
export const videoPostComment = (params: VideoPostCommentReq) => {
    return httpRequest.post('/contribution/videoPostComment', params);
}

//单独获取视频评论
export const getVideoComment = (params: GetVideoCommentReq) => {
    return httpRequest.post<GetVideoCommentRes>('/contribution/getVideoComment', params);
}
