import DPlayer from "dplayer"
import { Ref } from "vue"


export interface liveRoomProp {
    dp?: DPlayer   //未初始化时的定义
}

export interface  GetArticleContributionListByUserResItem  {
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

export type GetArticleContributionListByUserRes = Array<GetArticleContributionListByUserResItem>