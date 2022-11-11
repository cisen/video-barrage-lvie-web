<template>
  <div class="side-navigation">
    <div>
      <div class="avatar-box">
        <el-avatar :size="110" :src="userInfo.userInfoData.photo" />
      </div>
      <p>{{ userInfo.userInfoData.userName }}</p>
    </div>
    <el-menu
      class="el-menu-vertical"
      :collapse-transition="false"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
    >
      <el-sub-menu index="userShow">
        <template #title>
          <SvgIcon name="user" class="icon"></SvgIcon>
          <span>用户信息</span>
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
      <el-menu-item index="直播设置">
        <div class="icon-item">
          <SvgIcon name="live" class="icon"></SvgIcon>
          <span>直播设置</span>
        </div>
      </el-menu-item>
      <el-menu-item index="我的收藏">
        <div class="icon-item">
          <SvgIcon name="collection" class="icon"></SvgIcon>
          <span>我的收藏</span>
        </div>
      </el-menu-item>
      <el-menu-item index="数据展示">
        <div class="icon-item">
          <SvgIcon name="dataShow" class="icon"></SvgIcon>
          <span>数据展示</span>
        </div>
      </el-menu-item>
      <el-menu-item index="历史记录">
        <div class="icon-item">
          <SvgIcon name="playRecording" class="icon"></SvgIcon>
          <span>历史记录</span>
        </div>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore, useGlobalStore } from "@/store/main";
import { useRouter} from "vue-router"

const userInfo = useUserStore();
const router =  useRouter();
const handleOpen = (key: string, keyPath: string[]) => {
  router.push({name : key})
};
const handleClose = (key: string, keyPath: string[]) => {
  router.push({name : key})
};

const handleSelect = (key: string, keyPath: string[]) => {
  router.push({name : key})

}


</script>

<style scoped lang="scss">
@import "./style/personalNavigation.scss";
</style>
