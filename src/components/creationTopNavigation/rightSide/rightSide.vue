<template>
  <div class="info">
    <div class="avatar">
      <router-link to="/personal">
        <el-avatar :size="36" :src="userInfo.userInfoData.photo" />
      </router-link>
    </div>
    <div class="tips-calendar-wrap">
      成为UP主的第675天
    </div>
    <div  class="line-divid"></div>

    <SvgIcon name="message" class="icon left-icon"></SvgIcon>

    <SvgIcon name="download" class="icon"></SvgIcon>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"
import { useUserStore } from "@/store/main";


const userInfo = useUserStore();
const router = useRouter()

//跳转
const jump = (name: string) => {
  router.push({
    name
  })
}


</script>

<style scoped lang="scss">
@import "../style/rightSide.scss";
</style>
