import { reactive, ref } from "vue";
import { saveLiveDataReq, getLiveDataRes, liveInformation } from "@/types/personal/live/setUp"
import { saveLiveDataRequist, getLiveDataRequist } from "@/apis/personal"
import Swal from 'sweetalert2'
import { FormInstance, UploadProps, UploadRequestOptions } from 'element-plus'
import { useUserStore } from "@/store/main";
import useClipboard from "vue-clipboard3";
import globalScss from "@/assets/styles/global/export.module.scss"
import { validateLiveInformation } from "@/utils/validate/validate";
import { getLocation } from "@/utils/conversion/stringConversion"
import { uploadFile } from '@/utils/upload/upload';
import { getuploadingMethod } from "@/apis/commonality"
import { getUploadingMethodRrq, getUploadingMethodRrs } from "@/types/commonality/commonality"

export const useAvatarProp = () => {
    const userStore = useUserStore()
    const saveDateFormRef = ref<FormInstance>()
    const liveInformationForm = reactive<liveInformation>({
        imageUrl: '',
        uploadUrl: "",
        title: "",
        uploadType: "",
        data: {},
        action: "#",
    });

    //定义请求结果原始数据
    const rawData = reactive<getLiveDataRes>({
        title: "",
        img: ""
    })

    return {
        userStore,
        liveInformationForm,
        saveDateFormRef,
        rawData
    }
}


export const useHandleAvatarMethod = (liveInformationForm: liveInformation) => {

    const handleAvatarSuccess: UploadProps['onSuccess'] = (
        response,
        uploadFile
    ) => {
        liveInformationForm.imageUrl = URL.createObjectURL(uploadFile.raw!)
    }

    const handleAvatarError: UploadProps['onError'] = (
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


    const beforeAvatarUpload: UploadProps['beforeUpload'] = async (rawFile) => {
        if (rawFile.size / 1024 / 1024 > 2) {
            Swal.fire({
                title: "文件不符合格式",
                heightAuto: false,
                confirmButtonColor: globalScss.colorButtonTheme,
                icon: "error",
            })
            return false
        }
        return true
    }

    const RedefineUploadFile = async (params: UploadRequestOptions) => {
        try {
            const response = await uploadFile(liveInformationForm.uploadType, params.file)
            liveInformationForm.uploadUrl = response.path
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
        handleAvatarSuccess,
        beforeAvatarUpload,
        handleAvatarError,
        RedefineUploadFile
    }

}

export const useSaveData = async (liveInformationForm: liveInformation, formEl: FormInstance | undefined, rawData: getLiveDataRes) => {
    if (!formEl) return;

    await formEl.validate(async (valid, fields) => {
        if (valid) {
            try {
                if (liveInformationForm.uploadUrl == rawData.img && liveInformationForm.title == rawData.title) throw "未修改信息" ;
                if (!liveInformationForm.uploadUrl) throw "请先上传图片"
                const requistData = <saveLiveDataReq>{
                    type: liveInformationForm.uploadType,
                    imgUrl: liveInformationForm.uploadUrl,
                    title: liveInformationForm.title,
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

export const useInit = async (liveInformationForm: liveInformation, rawData: getLiveDataRes) => {
    try {
        //获取用户信息
        const data = (await getLiveDataRequist()).data as getLiveDataRes;
        liveInformationForm.imageUrl = data.img
        const imgPathInfo = getLocation(data.img)
        //如何后端返回全路径取域名后路径
        if (imgPathInfo?.pathname) {
            liveInformationForm.uploadUrl = imgPathInfo?.pathname
            rawData.img = imgPathInfo?.pathname
        }
        //保存原始数据
        rawData.title = data.title
        liveInformationForm.title = data.title
        //获取当前接口的请求方法
        const updataMenhod = (await getuploadingMethod(<getUploadingMethodRrq>{
            method: "liveCover"
        })).data as getUploadingMethodRrs
        liveInformationForm.uploadType = updataMenhod.type
        console.log(updataMenhod)

    } catch (err) {
        console.log(err)
    }
}

export const useCopy = async (text: string) => {
    try {
        const { toClipboard } = useClipboard();
        await toClipboard(text); //实现复制
        Swal.fire({
            title: "复制成功",
            confirmButtonColor: globalScss.colorButtonTheme,
            heightAuto: false,
            icon: "success",

        })
    } catch (e) {
        console.error(e);
    }
};

//表单验证
export const useRoles = () => {
    const liveInformationRules = reactive({
        title: [{ validator: validateLiveInformation, trigger: 'change' }],
    });
    return {
        liveInformationRules,
    };
};