import { fileHash, fileSuffix } from "./fileManipulation";
import {uploadFile} from "@/apis/personal"
/**
 * 往本地上传文件
 * @param file File对象
 * @returns {Promise<{name:string,host:string}>}
 */
export const localUpload = (file: any): Promise<{ path: string}> => {
    return  new Promise(async (resolve, reject) =>  {
        // 计算文件Hash 避免多余的文件上传，这样做的目的是尽量少占用的空间
        const name = await fileHash(file) + fileSuffix(file.name)
        const formData = new FormData()
        const key = `${name}`
        formData.append('name', name)
        formData.append('file', file)
        try{
            const response = await uploadFile(formData)
            resolve({path : response.data as string})
            console.log(response)
        }catch(err){
            console.log(err)
            reject({msg: '上传失败'})
        }
     
    })
}