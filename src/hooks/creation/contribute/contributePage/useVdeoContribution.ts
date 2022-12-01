import { reactive, ref } from "vue";
import { saveLiveDataReq, getLiveDataRes, liveInformation } from "@/types/personal/live/setUp"
import { saveLiveDataRequist, getLiveDataRequist } from "@/apis/personal"
import Swal from 'sweetalert2'
import { FormInstance, UploadProps, UploadRequestOptions } from 'element-plus'
import { useUserStore } from "@/store/main";
import globalScss from "@/assets/styles/global/export.module.scss"
import { getLocation } from "@/utils/conversion/stringConversion"
import { uploadFile } from '@/utils/upload/upload';
import { getuploadingMethod } from "@/apis/commonality"
import { getUploadingMethodRrq, getUploadingMethodRrs } from "@/types/commonality/commonality"

import {vdeoContributionForm , uploadFileformation} from "@/types/creation/contribute/contributePage/vdeoContribution"
import axios from "axios";

export const useVdeoContributionProp = () => {
    const userStore = useUserStore()
    const form = reactive(<vdeoContributionForm>{
        isShow : false , 
        title: '',
        type: '',
        timing : false,
        date1: '',
        date2: '',
        label : "",
        introduce: "",
    })
    const uploadFileformation =  reactive(<uploadFileformation>{
        progress : 0,
        FileUrl: '',
        uploadUrl: "",
        interface : "videoContribution",
        uploadType: "",
        action: "#",
    })
    return {
        userStore,
        form,
        uploadFileformation
    }
}


export const useHandleFileMethod = (uploadFileformation: uploadFileformation ,form :vdeoContributionForm) => {

    const handleFileSuccess: UploadProps['onSuccess'] = (
        response,
        uploadFile
    ) => {
        uploadFileformation.FileUrl = URL.createObjectURL(uploadFile.raw!)
    }

    const handleFileError: UploadProps['onError'] = (
        response,
    ) => {
        console.log("上传失败")
        Swal.fire({
            title: "上传失败",
            heightAuto: false,
            confirmButtonColor: globalScss.colorButtonTheme,
            icon: "error",

        })
        console.log(response)

    }

    //上传前处理
    const beforeFileUpload: UploadProps['beforeUpload'] = async (rawFile) => {
        return true
    }

    const RedefineUploadFile = async (params: UploadRequestOptions) => {
        try {
            const response = await uploadFile(uploadFileformation, params.file)
            console.log(response)
            uploadFileformation.uploadUrl = response.path
            console.log(response)
        } catch (err) {
            console.log(err)
            Swal.fire({
                title: "获取上传节点失败",
                heightAuto: false,
                confirmButtonColor: globalScss.colorButtonTheme,
                icon: "error",
            })
        }
    }

    return {
        handleFileSuccess,
        beforeFileUpload,
        handleFileError,
        RedefineUploadFile
    }

}

export const useSaveData = async (uploadFileformation: liveInformation, formEl: FormInstance | undefined, rawData: getLiveDataRes) => {
    if (!formEl) return;

    await formEl.validate(async (valid, fields) => {
        if (valid) {
            try {
                if (uploadFileformation.uploadUrl == rawData.img && uploadFileformation.title == rawData.title) throw "未修改信息" ;
                if (!uploadFileformation.uploadUrl) throw "请先上传图片"
                const requistData = <saveLiveDataReq>{
                    type: uploadFileformation.uploadType,
                    imgUrl: uploadFileformation.uploadUrl,
                    title: uploadFileformation.title,
                }
                const data = await saveLiveDataRequist(requistData)
                console.log(data)
                Swal.fire({
                    title: "修改成功",
                    confirmButtonColor: globalScss.colorButtonTheme,
                    heightAuto: false,
                    icon: "success",

                })
                console.log("上传成功")
            } catch (err) {
                console.log(err)
                Swal.fire({
                    title: err as string,
                    confirmButtonColor: globalScss.colorButtonTheme,
                    heightAuto: false,
                    icon: "warning",

                })
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}




export const useInit = async (uploadFileformation: uploadFileformation) => {
    try {
        //获取当前接口的请求方法
        const updataMenhod = (await getuploadingMethod(<getUploadingMethodRrq>{
            method: uploadFileformation.interface
        })).data as getUploadingMethodRrs 
        uploadFileformation.uploadType = updataMenhod.type
        console.log(updataMenhod) 

    } catch (err) {
        console.log(err)
    }
}
