import { ElLoading, ElMessage } from "element-plus"
import { useGlobalStore } from "@/store/main"
import { OssConfig } from "@/types/idnex"
import { getOssConfig, getuploadingMethod } from "@/apis/commonality"
import axios from "axios"
import { fileHash, fileSuffix } from "./fileManipulation"
import { getOssConfigdRrq } from "@/types/commonality/commonality"

/**
 * 初始化Oss配置
 * @returns {Promise<OssConfig>}
 */
export const initOssConfig = async (_interface: string): Promise<OssConfig> => {
    return new Promise((resolve, reject) => {
        // 从本地localstore从获取配置
        const globalStore = useGlobalStore()
        const conf = globalStore.globalData.oss
        if (conf) {
            //  配置存在并且距离过期时间还大于3秒则返回此配置
            const now = new Date().getTime() / 1000
            if (conf.expire - 3 > now) {
                resolve(conf)
                return
            }
        } 
        // 请求接口返回配置数据
        getOssConfig(<getOssConfigdRrq>{
            interface :  _interface 
        })
            .then((res) => {
                if (res.code == 200) {
                    resolve(res.data as OssConfig);

                    // 配置数据写入本地store
                    globalStore.setGlobalOss(res.data as OssConfig)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                console.log(err);
                reject(err)
            })
    })
}

/**
 * 往Oss上传文件
 * @param file File对象
 * @returns {Promise<{name:string,host:string}>}
 */
export const ossUpload = (file: any, _interface: string): Promise<{ path: string }> => {
    return new Promise((resolve, reject) => {
        initOssConfig(_interface)
            .then(async (ossConf) => {
                const config = {
                    timeout: 1000 * 60 * 10,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
                // 计算文件Hash 避免多余的文件上传，这样做的目的是尽量少占用OSS的空间
                const name = await fileHash(file) + fileSuffix(file.name)
                const formData = new FormData()
                const key = `${ossConf.dir}${name}`

                formData.append('name', name)
                formData.append('key', key)
                formData.append('policy', ossConf?.policy)
                formData.append('OSSAccessKeyId', ossConf?.access_id)
                formData.append('success_action_status', '200')
                formData.append('signature', ossConf.signature)
                formData.append('file', file)
                axios
                    .post(ossConf.host, formData, config)
                    .then((resp) => {
                        resolve({ path: key })
                    })
                    .catch((err) => reject(err))
            })
            .catch((err) => {
                console.log(err);
                reject({ msg: '上传失败' })
            })
    })
}

