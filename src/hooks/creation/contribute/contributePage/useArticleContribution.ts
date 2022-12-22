import { Router, useRouter } from 'vue-router';
import { nextTick, reactive, Ref, ref, toRaw } from "vue";
import Swal from 'sweetalert2'
import { ElInput, FormInstance, UploadProps, UploadRawFile, UploadRequestOptions } from 'element-plus'
import globalScss from "@/assets/styles/global/export.module.scss"
import { uploadFile } from '@/utils/upload/upload';
import { getFullPathOfImage, getuploadingMethod } from "@/apis/commonality"
import { getUploadingMethodRrq, getUploadingMethodRrs } from "@/types/commonality/commonality"
import { uploadFileformation } from "@/types/creation/contribute/contributePage/vdeoContribution"
import { QuillOptionsStatic } from 'quill';
import { ArticleContribution, AreateArticleContributionReq } from '@/types/creation/contribute/contributePage/articleContribution';
import { validateArticleTitle } from '@/utils/validate/validate';
import { timetoRFC3339 } from '@/utils/conversion/timeConversion';
import { createArticleContribution } from '@/apis/contribution';
import hljs from 'highlight.js';

export const useArticleContributionProp = () => {
    const router = useRouter()
    //富文本组件ref
    const myQuillEditor = ref()
    //内容
    const form = reactive(<ArticleContribution>{
        isShow: true,
        title: "",
        content: "",
        timing: false,
        comments: true,
        date1time: '',
        labelInputVisible: false,
        labelText: "",
        label: [],
    })
    const labelInputRef = ref<InstanceType<typeof ElInput>>()
    //配置
    const options = reactive(<QuillOptionsStatic>{
        modules: {
            toolbar: {
                container: [
                    [{ size: ["small", false, "large"] }],
                    ["bold", "italic", "underline"],
                    ['code-block'],
                    [{ header: 1 }, { header: 2 }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    [{ color: [] }, { background: [] }],
                    [{ align: [] }]
                ],
                handlers: {
                    image: function (value: any) {
                        console.log("value", value)
                        if (value) {
                            // 触发自定义的上传
                            console.log("触发自定义的上传")
                            console.log(uploadBtnRef.value.$el.click())
                        } else {
                            myQuillEditor.value.format("image", false);
                        }
                    }
                },
                image: () => {

                }
            },
            history: {
                delay: 1000,
                maxStack: 50,
                userOnly: false
            },
            syntax: {
                highlight: (text: string) => hljs.highlightAuto(text).value
              },
        },
    });
    //上传组件ref
    const uploadRef = ref()
    const uploadBtnRef = ref()
    const ruleFormRef = ref<FormInstance>()
    const uploadProgressRef = ref<HTMLElement | null>()
    //富文本图片上传
    const uploadFileformation = reactive(<uploadFileformation>{
        progress: 0,
        FileUrl: '',
        uploadUrl: "",
        interface: "articleContribution",
        uploadType: "",
        action: "#",
    })
    //文章封面上传
    const uploadCoveration = reactive(<uploadFileformation>{
        progress: 0,
        FileUrl: '',
        uploadUrl: "",
        interface: "articleContributionCover",
        uploadType: "",
        action: "#",
    })

    const colors = [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 },
    ]


    return {
        router,
        uploadFileformation,
        uploadCoveration,
        labelInputRef,
        ruleFormRef,
        uploadRef,
        uploadBtnRef,
        uploadProgressRef,
        myQuillEditor,
        form,
        options,
        colors
    }
}

//上传文件处理
export const useHandleFileMethod = (uploadFileformation: uploadFileformation, form: ArticleContribution, myQuillEditor: Ref, uploadProgressRef: Ref) => {

    const handleFileSuccess: UploadProps['onSuccess'] = async (
        response,
        uploadFile
    ) => {
        uploadFileformation.FileUrl = URL.createObjectURL(uploadFile.raw!)
        //拼接完整路径
        const path = await getFullPathOfImage({ path: uploadFileformation.uploadUrl, type: uploadFileformation.uploadType })
        // 获取富文本实例
        let quill = toRaw(myQuillEditor.value).getQuill()
        // 获取光标位置
        let length = quill.selection.savedRange.index;
        // 插入图片 
        quill.insertEmbed(length, "image", path.data);
        // 调整光标到最后 
        quill.setSelection(length + 1);

        Swal.close()
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
            console.log(uploadProgressRef.value.$el)
            uploadProgressRef.value.$el.style.display = "";
            Swal.fire({
                title: '文件上传中...',
                html: uploadProgressRef.value.$el,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                heightAuto: false,
                confirmButtonColor: globalScss.colorButtonTheme,
            })
            const response = await uploadFile(uploadFileformation, params.file)

            console.log("上传成功")
            console.log(response)
            uploadFileformation.uploadUrl = response.path
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
//上传封面处理
export const useHandleCoverMethod = (uploadCoveration: uploadFileformation) => {

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

//标签处理
export const userLabelHandlMethod = (form: ArticleContribution, labelInputRef: Ref) => {
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
export const useSaveData = async (form: ArticleContribution, formEl: FormInstance | undefined, router: Router, uploadFileformation: uploadFileformation, uploadCoveration: uploadFileformation) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            try {
                if (!uploadCoveration.uploadUrl) throw "请先上传封面"
                if (!form.timing) {
                    form.date1time = timetoRFC3339(new Date())
                }
                let requistData = <AreateArticleContributionReq>{
                    cover: uploadCoveration.uploadUrl,
                    coverUploadType: uploadCoveration.uploadType,
                    articleContributionUploadType: uploadFileformation.uploadType,
                    title: form.title,
                    timing: form.timing,
                    timingTime: form.date1time,
                    label: form.label,
                    content: form.content,
                    comments: form.comments
                }
                let response = await createArticleContribution(requistData)
                Swal.fire({
                    title: "发布成功",
                    confirmButtonColor: globalScss.colorButtonTheme,
                    heightAuto: false,
                    icon: "success",
                    preConfirm: () => {
                        router.push({ name: "Creation" })
                    }
                })
            } catch (err) {
                Swal.fire({
                    title: (err as Error).message ,
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
    const articleContributionRules = reactive({
        title: [{ validator: validateArticleTitle, trigger: 'change' }],
    });
    return {
        articleContributionRules,
    };
}; 
