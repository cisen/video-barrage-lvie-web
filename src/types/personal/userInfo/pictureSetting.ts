export  interface  uploadAvatar {
    imageUrl: string,
    uploadUrl: string,
    headers: {
        token : string
    },
    data? : Array<unknown>,
    action:string,
}