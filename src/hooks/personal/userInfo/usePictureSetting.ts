import { reactive } from "vue";
import { uploadAvatar } from "@/types/personal/userInfo/pictureSetting"
import { updateAvatarReq } from "@/types/personal/userInfo/userInfo"
import { updateAvatarRequist } from "@/apis/personal"
import Swal from 'sweetalert2'
import type { UploadProps } from 'element-plus'
import { useUserStore } from "@/store/main";
import globalScss from "@/assets/styles/global/export.module.scss"
 
export const useAvatarProp = () => {
    const userStore = useUserStore ()
    const uploadAvatarForm = reactive<uploadAvatar>({
        imageUrl: '',
        uploadUrl: "",
        headers: { "token": userStore.userInfoData.token },
        data: [], 
        action: "http://localhost:8080/user/upload",
    });

    return {
        userStore,
        uploadAvatarForm
    }
}


export const useHandleAvatarMethod = (uploadAvatarForm: uploadAvatar) => {

    const handleAvatarSuccess: UploadProps['onSuccess'] = (
        response,
        uploadFile
    ) => {
        uploadAvatarForm.imageUrl = URL.createObjectURL(uploadFile.raw!)
        console.log(response)
        uploadAvatarForm.uploadUrl = response.data
    }


    const handleAvatarError: UploadProps['onError'] = (
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


    const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
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

    return {
        handleAvatarSuccess,
        beforeAvatarUpload,
        handleAvatarError,
    }

}

export const useUpdateAvatar = async (store: any, uploadAvatarForm: uploadAvatar) => {
    try {
        if (!uploadAvatarForm.uploadUrl) throw "请先上传图片"
        const requistData = <updateAvatarReq>{
            imgUrl: uploadAvatarForm.uploadUrl
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