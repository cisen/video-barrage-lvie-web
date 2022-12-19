//form 表单结构
export interface articleContribution {
    isShow : boolean
    title : string
    content : string
    timing: boolean,
    comments : boolean,
    date1time: string,
    labelInputVisible: boolean,
    labelText: string,
    label: Array<string>,
}

//api createArticleContribution 需要结构
export interface createArticleContributionReq {
    cover: string,
    coverUploadType: string,
    articleContributionUploadType : string,
    title: string,
    timing: boolean,
    timingTime?: string,
    label:  Array<string>,
    content: string,
    comments : boolean
}

//api GetArticleContributionListByUser 需要结构
export interface GetArticleContributionListByUserReq {
    userID : Number
}

