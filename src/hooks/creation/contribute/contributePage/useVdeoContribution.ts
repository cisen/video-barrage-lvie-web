import { Router, useRouter } from 'vue-router';
import { nextTick, reactive, Ref, ref } from "vue";
import Swal from 'sweetalert2'
import { ElInput, FormInstance, UploadProps, UploadRawFile, UploadRequestOptions } from 'element-plus'
import { useUserStore } from "@/store/main";
import globalScss from "@/assets/styles/global/export.module.scss"
import { uploadFile } from '@/utils/upload/upload';
import { getuploadingMethod } from "@/apis/commonality"
import { getUploadingMethodRrq, getUploadingMethodRrs } from "@/types/commonality/commonality"
import {fileReader} from "@/utils/fun/fun"
import { vdeoContributionForm, uploadFileformation, createVideoContributionReq } from "@/types/creation/contribute/contributePage/vdeoContribution"
import { validateVideoIntroduce, validateVideoTitle } from "@/utils/validate/validate";
import { createVideoContribution } from "@/apis/contribution";
import { timetoRFC3339 } from "@/utils/conversion/timeConversion";

export const useVdeoContributionProp = () => {
    const userStore = useUserStore()
    const formRef = ref<FormInstance>()
    const ruleFormRef = ref<FormInstance>()
    const router = useRouter()
    const video = ref() //上传的视频信息
    const form = reactive(<vdeoContributionForm>{
        isShow: false,
        title: '',
        type: false,
        timing: false,
        date1time: '',
        labelInputVisible: false,
        labelText: "",
        label: [],
        introduce: "",
    })
    const uploadFileformation = reactive(<uploadFileformation>{
        progress: 0,
        FileUrl: '',
        uploadUrl: "",
        interface: "videoContribution",
        uploadType: "",
        action: "#",
    })

    const uploadCoveration = reactive(<uploadFileformation>{
        progress: 0,
        FileUrl: '',
        uploadUrl: "",
        interface: "videoContributionCover",
        uploadType: "",
        action: "#",
    })
    const labelInputRef = ref<InstanceType<typeof ElInput>>()
    return {
        ruleFormRef,
        userStore,
        formRef,
        form,
        router,
        uploadFileformation,
        uploadCoveration,
        labelInputRef,
        video
    }
}

//上传视频处理
export const useHandleFileMethod = (uploadFileformation: uploadFileformation, form: vdeoContributionForm, video: Ref) => {

    const handleFileSuccess: UploadProps['onSuccess'] =  async (
        response,
        uploadFile
    ) => {
        uploadFileformation.FileUrl = URL.createObjectURL(uploadFile.raw!)
        // video.value.src = URL.createObjectURL(uploadFile.raw!)
        video.value.onloadedmetadata = () =>{
            console.log(" onloadedmetadata 视频时长", video.value.duration)
        }
        const readerInfo =  await fileReader(uploadFile.raw!)
        video.value.src = readerInfo?.result       
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
    const beforeFileUpload: UploadProps['beforeUpload'] = async (rawFile: UploadRawFile) => {
        return true
    }

    //修改默认请求
    const RedefineUploadFile = async (params: UploadRequestOptions) => {
        try {
            form.isShow = !form.isShow
            const response = await uploadFile(uploadFileformation, params.file)
            console.log(response)
            uploadFileformation.uploadUrl = response.path
        } catch (err) {
            console.log(err)
            form.isShow = false
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

//上传封面处理
export const useHandleCoverMethod = (uploadCoveration: uploadFileformation, form: vdeoContributionForm) => {

    const handleFileSuccess: UploadProps['onSuccess'] = (
        response,
        uploadFile
    ) => {
        uploadCoveration.FileUrl = URL.createObjectURL(uploadFile.raw!)
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
    const beforeFileUpload: UploadProps['beforeUpload'] = async (rawFile: UploadRawFile) => {
        return await new Promise<boolean>((resolve, reject) => {
            //判断大小
            if (rawFile.size / 1024 / 1024 > 2) {
                Swal.fire({
                    title: "封面大小不能大于2M",
                    heightAuto: false,
                    icon: "error",

                })
                reject(false);
            }
            //判断尺寸
            let reader = new FileReader();
            reader.readAsDataURL(rawFile);
            reader.onload = () => {
                // 让页面中的img标签的src指向读取的路径
                let img = new Image();
                img.src = reader.result as string;
                img.onload = () => {
                    console.log(img.width);
                    console.log(img.height);
                    if (img.width < 960 || img.height < 600) {
                        Swal.fire({
                            title: "请上传 960*600 尺寸以上图片",
                            heightAuto: false,
                            confirmButtonColor: globalScss.colorButtonTheme,
                            icon: "error",
                        });
                        reject(false);
                    } else {
                        resolve(true);
                    }
                };
            };
        })
    }

    //修改默认请求
    const RedefineUploadFile = async (params: UploadRequestOptions) => {
        try {
            const response = await uploadFile(uploadCoveration, params.file)
            console.log(response)
            uploadCoveration.uploadUrl = response.path
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


export const userLabelHandlMethod = (form: vdeoContributionForm, labelInputRef: Ref) => {
    const handleClose = (tag: string) => {
        form.label.splice(form.label.indexOf(tag), 1)
    }

    const showInput = () => {
        form.labelInputVisible = true
        nextTick(() => {
            labelInputRef.value!.input!.focus()
        })
    }

    const handleInputConfirm = () => {
        if (form.labelText) {
            form.label.push(form.labelText)
        }
        form.labelInputVisible = false
        form.labelText = ''
    }

    return {
        handleClose,
        showInput,
        handleInputConfirm
    }

}
export const useSaveData = async (form: vdeoContributionForm, uploadFileformation: uploadFileformation, uploadCoveration: uploadFileformation, formEl: FormInstance | undefined, router: Router) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            try {
                if (!uploadFileformation.uploadUrl) throw "上传未完成"
                if (!uploadCoveration.uploadUrl) throw "请先上传封面"
                if (!form.timing) {
                    form.date1time = timetoRFC3339(new Date())
                }
                let requistData = <createVideoContributionReq>{
                    video: uploadFileformation.uploadUrl,
                    videoUploadType: uploadFileformation.uploadType,
                    cover: uploadCoveration.uploadUrl,
                    coverUploadType: uploadCoveration.uploadType,
                    title: form.title,
                    reprinted: form.type,
                    timing: form.timing,
                    timingTime: form.date1time,
                    label: form.label,
                    introduce: form.introduce,
                }
                let response = await createVideoContribution(requistData)
                Swal.fire({
                    title: "发布成功",
                    confirmButtonColor: globalScss.colorButtonTheme,
                    heightAuto: false,
                    icon: "success",
                    preConfirm: () => {
                        router.push({ name: "Creation" })
                    }
                })
                console.log(response)
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




export const useInit = async (uploadFileformation: uploadFileformation, uploadCoveration: uploadFileformation) => {
    try {
        //获取当前接口的请求方法
        const updataMenhod = (await getuploadingMethod(<getUploadingMethodRrq>{
            method: uploadFileformation.interface
        })).data as getUploadingMethodRrs
        uploadFileformation.uploadType = updataMenhod.type
        const updataMenhodCover = (await getuploadingMethod(<getUploadingMethodRrq>{
            method: uploadCoveration.interface
        })).data as getUploadingMethodRrs
        uploadCoveration.uploadType = updataMenhod.type

    } catch (err) {
        console.log(err)
        Swal.fire({
            title: "获取上传方法失败",
            heightAuto: false,
            confirmButtonColor: globalScss.colorButtonTheme,
            icon: "error",
        })
    }
}

//表单验证
export const useRules = () => {
    const videoContributionRules = reactive({
        title: [{ validator: validateVideoTitle, trigger: 'change' }],
        introduce: [{ validator: validateVideoIntroduce, trigger: 'change' }]
    });
    return {
        videoContributionRules,
    };
}; 
