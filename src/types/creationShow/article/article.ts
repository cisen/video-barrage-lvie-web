export interface  GetArticleContributionByIDReq{
    articleID : number

}
export interface  GetArticleContributionByIDRes{
    id: number
    uid: number
    title: string 
    cover: string
    label: Array<string>
    content: string
    is_comments: boolean
    heat: number
    likes_number: number
    comments_number: number
    created_at: string
    is_stay : boolean
}