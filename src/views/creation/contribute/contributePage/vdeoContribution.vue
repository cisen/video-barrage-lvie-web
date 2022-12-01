<template>
    <div class="vdeo-contribution">
        <div class="upload-box">
            <el-upload class="upload" drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                multiple :on-success="handle.handleFileSuccess" :on-error="handle.handleFileError"
                :before-upload="handle.beforeFileUpload" :auto-upload="true" :http-request="handle.RedefineUploadFile">
                <el-icon class="el-icon--upload">
                    <upload-filled />
                </el-icon>
                <div class="el-upload__text">
                    拖拽到此处也可上传
                </div>
                <div class="upload-btn">
                    <el-button type="primary">
                        Upload<el-icon class="el-icon--right">
                            <Upload />
                        </el-icon>
                    </el-button>
                </div>
                <div class="upload-audit">
                    当前审核队列 <el-tag class="tag" round>快速</el-tag>
                </div>
            </el-upload>
        </div>

        <div class="form-box" v-show="!form.isShow"> 
        <p>文件上传进度</p>
             <el-progress :text-inside="true" :stroke-width="16" :percentage="uploadFileformation.progress" />
            <h3> 基本设置</h3>

            <el-form :model="form" label-width="120px" label-position="left">
                <el-form-item label="标题">
                    <el-input v-model="form.title" />
                </el-form-item>
                <el-form-item label="类型">
                    <el-radio-group v-model="form.type">
                        <el-radio label="自制" />
                        <el-radio label="转载" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="定时发布">
                    <el-switch v-model="form.timing" />
                </el-form-item>
                <el-form-item label="选择时间" v-show="form.timing" class="animate__animated animate__bounceIn">
                    <el-col :span="7">
                        <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%" />
                    </el-col>
                    <el-col :span="1" class="text-center">
                        <span class="text-gray-500">-</span>
                    </el-col>
                    <el-col :span="6">
                        <el-time-picker v-model="form.date2" placeholder="选择时间" style="width: 100%" />
                    </el-col>
                </el-form-item>
                <el-form-item label="标签">
                    <el-input v-model="form.label" />
                </el-form-item>

                <el-form-item label="介绍">
                    <el-input resize="none" maxlength="2000" rows="4" v-model="form.introduce" type="textarea" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>

</template>
  
<script setup lang="ts">
import { useVdeoContributionProp, useHandleFileMethod, useInit } from "@/hooks/creation/contribute/contributePage/useVdeoContribution"
import { UploadFilled, Upload } from '@element-plus/icons-vue'
import { onMounted, reactive } from 'vue';

const { userStore, form, uploadFileformation } = useVdeoContributionProp()
const handle = useHandleFileMethod(uploadFileformation, form)

const onSubmit = () => {
    console.log(123)
}


onMounted(() => {
    useInit(uploadFileformation)
})
</script>

<style scoped lang="scss">
.vdeo-contribution {
    margin: 0 auto;
    max-width: 70%;
    padding-top: 16px;
    padding-bottom: 16px;

    .upload-box {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .upload {
            width: 100%;

            .upload-btn {
                margin-top: 2rem;
            }

            .upload-audit {
                margin-top: 1.4rem;
                font-size: 14px;
                color: #999;

                .tag {
                    margin-left: 6px;
                }
            }
        }

    }

    .form-box {
        text-align: initial;
    }
}
</style>