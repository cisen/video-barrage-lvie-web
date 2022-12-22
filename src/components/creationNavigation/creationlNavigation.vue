<template>
  <div class="side-navigation">

    <div class="contribute">
      <el-button class="btn" v-removeFocus type="primary" @click="jump('Contribute')" round>投稿</el-button>
    </div>
    <el-menu class="el-menu-vertical" :collapse-transition="false" @open="handleOpen" @close="handleClose"
      @select="handleSelect">
      <el-menu-item index="pictureSetting">
        <div class="icon-item">
          <SvgIcon name="home" class="icon"></SvgIcon>
          <span>首页</span>
        </div>
      </el-menu-item>
      <el-sub-menu index="userShow">
        <template #title>
          <SvgIcon name="eg" class="icon"></SvgIcon>
          <span>稿件管理</span>
        </template>
        <el-menu-item index="userInfo">
          <div class="icon-item">
            <SvgIcon name="userData" class="icon"></SvgIcon>
            <span>个人信息</span>
          </div>
        </el-menu-item>
        <el-menu-item index="pictureSetting">
          <div class="icon-item">
            <SvgIcon name="pictures" class="icon"></SvgIcon>
            <span>头像设置</span>
          </div>
        </el-menu-item>
        <el-menu-item index="用户安全">
          <div class="icon-item">
            <SvgIcon name="security" class="icon"></SvgIcon>
            <span>用户安全</span>
          </div>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="liveSetUp">
        <div class="icon-item">
          <SvgIcon name="dataManagement" class="icon"></SvgIcon>
          <span>数据中心</span>
        </div>
      </el-menu-item>
      <el-menu-item index="我的粉丝">
        <div class="icon-item">
          <SvgIcon name="myConcern" class="icon"></SvgIcon>
          <span>我的粉丝</span>
        </div>
      </el-menu-item>
      <el-menu-item index="互动管理">
        <div class="icon-item">
          <SvgIcon name="discuss" class="icon"></SvgIcon>
          <span>互动管理</span>
        </div>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store/main";
import { vRemoveFocus } from "@/utils/customInstruction/focus"
import { useRouter } from "vue-router"

const userInfo = useUserStore();
const router = useRouter();
const handleOpen = (key: string, keyPath: string[]) => {
  router.push({ name: key })
};
const handleClose = (key: string, keyPath: string[]) => {
  router.push({ name: key })
};

const handleSelect = (key: string, keyPath: string[]) => {
  router.push({ name: key })

}

//跳转
const jump = (name: string) => {
  console.log(123123)
  router.push({
    name
  })
}

</script>

<style scoped lang="scss">
@import "./static/style/creationNavigation.scss";
</style>
