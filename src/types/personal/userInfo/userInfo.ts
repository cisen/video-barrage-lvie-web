export interface UserInfoRes {
    username : string
    gender : number
    birth_date : string
    is_visible : boolean
    signature : string
}

export interface determineNameExistsReq {
    username : string
}

export type determineNameExistsRes = boolean

export type setUserInfoRes = boolean 
export interface updateAvatarReq {
    imgUrl :string
    interface : string
}