import { reactive } from "vue";
import { uploadAvatar } from "@/types/personal/userInfo/pictureSetting"
import { updateAvatarReq } from "@/types/personal/userInfo/userInfo"
import { updateAvatarRequist } from "@/apis/personal"
import Swal from 'sweetalert2'
import type { UploadProps, UploadRequestOptions } from 'element-plus'
import { useUserStore } from "@/store/main";
import globalScss from "@/assets/styles/global/export.module.scss"
import { getuploadingMethod } from "@/apis/commonality";
import { getUploadingMethodRrq, getUploadingMethodRrs } from "@/types/commonality/commonality";
import { uploadFile } from "@/utils/upload/upload";

export const useAvatarProp = () => {
    const userStore = useUserStore()
    const uploadAvatarForm = reactive<uploadAvatar>({
        imageUrl: '',
        uploadUrl: "",
        interface : "userAvatar",
        uploadType: "",
        action: "#",
    });

    return {
        userStore,
        uploadAvatarForm
    }
}


export const useHandleFileMethod = (uploadAvatarForm: uploadAvatar) => {

    const handleFileSuccess: UploadProps['onSuccess'] = (
        response,
        uploadFile
    ) => {
        uploadAvatarForm.imageUrl = URL.createObjectURL(uploadFile.raw!)
    }


    const handleFileError: UploadProps['onError'] = (
        response,
    ) => {
        console.log("上传失败")
        Swal.fire({
            title: "上传失败",
            heightAuto: false,
            icon: "error",

        })
        console.log(response)

    }

    const beforeFileUpload: UploadProps['beforeUpload'] = (rawFile) => {
        if (rawFile.size / 1024 / 1024 > 2) {
            Swal.fire({
                title: "文件不符合格式",
                heightAuto: false,
                icon: "error",

            })
            return false
        }
        console.log(rawFile.text)
        return true
    }


    const redefineUploadFile = async (params: UploadRequestOptions) => {
        try {
            const response = await uploadFile(uploadAvatarForm.uploadType,uploadAvatarForm.interface, params.file)
            uploadAvatarForm.uploadUrl = response.path
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
        redefineUploadFile
    }

}

export const useInit = async (uploadAvatarForm: uploadAvatar) => {
    try {
        const updataMenhod = (await getuploadingMethod(<getUploadingMethodRrq>{
            method: uploadAvatarForm.interface
        })).data as getUploadingMethodRrs
        uploadAvatarForm.uploadType = updataMenhod.type
        console.log(updataMenhod)

    } catch (err) {
        console.log(err)
    }
}


export const useUpdateAvatar = async (store: any, uploadAvatarForm: uploadAvatar) => {
    try {
        if (!uploadAvatarForm.uploadUrl) throw "请先上传图片"
        const requistData = <updateAvatarReq>{
            imgUrl: uploadAvatarForm.uploadUrl,
            interface : uploadAvatarForm.interface
        }
        const data = await updateAvatarRequist(requistData)
        console.log(data)
        uploadAvatarForm.imageUrl = ""
        store.userInfoData.photo = String(data.data) ?? ""
        Swal.fire({
            title: "更换成功",
            heightAuto: false,
            icon: "success",

        })
        console.log("上传成功")
    } catch (err) {
        console.log(err)
        Swal.fire({
            title: "请上传图片",
            confirmButtonColor: globalScss.colorButtonTheme,
            heightAuto: false,
            icon: "warning",

        })
    }
} 