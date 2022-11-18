<template>
  <div class="overall">
    <pageHeader title="更换头像" icon-nmae="pictures"></pageHeader>
    <div class=" principal  personal-layout animate__animated animate__slideInRight">
      <div class="form-box">
        <el-upload class="avatar-uploader" :action="imgUpload.action" :headers="imgUpload.headers"
          :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="imgUpload.imageUrl" :src="imgUpload.imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
        <di>
          <div class="avatar-show">
            <el-avatar :size="240" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          </div>
        </di>
      </div>
      <div class="bottom-box">
      <span class="text"> 请选择图片上传：大小180 * 180像素支持JPG、PNG等格式，图片需小于2M</span>
      <div class="button">
        <el-button type="primary" round>修改头像</el-button>
      </div>
      </div>
    </div>

  </div>
</template>
  
<script lang="ts" setup>
import { reactive } from 'vue'
import { ElMessage, ElNotification } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/main'
import type { UploadProps } from 'element-plus'

const userStore = useUserStore()

const imgUpload = reactive({
  imageUrl: '',
  headers: { "token": userStore.userInfoData.token },
  data: [],
  action: "http://localhost:8080/user/upload",

})


const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  console.log(response)
  imgUpload.imageUrl = URL.createObjectURL(uploadFile.raw!)
  ElNotification({
    title: 'Success',
    message: 'This is a success message', 
    type: 'success',
  })
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  console.log(rawFile.text)
  return true
}
</script>
<style scoped lang="scss">
.overall {
  .principal {
    padding-top: 20%;

    .form-box {
      display: flex;
      align-items: center;
      justify-content: center;

      .avatar-uploader {
        padding-right:30px;
        .avatar {
          width: 230px;
          height: 230px;
          display: block;
        }

        :deep(.el-upload) {
          border: 1px dashed #8c939d;
          border-radius: 50%;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: var(--el-transition-duration-fast);
        }

        .el-upload:hover {
          border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 230px;
          height: 230px;
          text-align: center;
        }

      }

      .avatar-show{
        padding-left:30px;
        border-left: 1px dashed #8c939d;
      }

    }

    .bottom-box{
      padding-top: 30px;
     

      .text{
        font-size: 12px;
        color: $color-gray-text ;
      }
      .button{

        margin-top: 30px;
      }
    }

  }

}
</style>
  