<template>
  <div class="overall" >
    <div class="head animate__animated animate__slideInDown">
      <div class="common-row">
        <el-row :gutter="20">
          <el-col :span="18">
            <div class="live-box">
              <LiveHeader
                src="http://127.0.0.1:8080/assets/static/img/users/headPortrait/uploaded/a1da5ca34b6347763e667b657b638e65c005b5b86c193e7187a84acd956b7739.png"
                titel="你没见过的丝滑操作" />
              <div ref="videoRef" class="player" id="dplay" />
            </div>
          </el-col>
          <el-col :span="6">
            <Side ref="sideRef" @sendMessage="sendMessage" :userInfo="userStore.userInfoData"></Side>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="content">
    <div class="content-row">
      <h3>Ta 的动态</h3>
      <el-row :gutter="20">
          <el-col :span="16">
            <div class="dynamic-box">
              <div class="dynamic"><Dynamic/></div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="recommended"><Announcement/></div>
          </el-col>
        </el-row>   
    </div>
   
    </div>
  </div>
</template> 
<script lang="ts"  setup >
import LiveHeader from "@/components/LiveBroadcast/liveHeader.vue"
import Side from "@/components/LiveBroadcast/side.vue";
import Announcement from "@/components/LiveBroadcast/announcement.vue";
import Dynamic from "@/components/LiveBroadcast/dynamic.vue";
import DPlayer from "dplayer"
import { useLiveRoomProp, useWebSocket, useInit } from "@/hooks/live/useLiveRoom"
import { onMounted, ref } from "vue";

components: {
  LiveHeader
  Side
  Dynamic
  Announcement
}
const sideRef = ref()
var dp: DPlayer //播放器配置对象
const { videoRef, userStore } = useLiveRoomProp()
const sendMessage = ref((tset: string) => {
})

onMounted(async () => {
  dp = await useInit(videoRef) as DPlayer
  sendMessage.value = useWebSocket(dp, userStore, sideRef).sendMessage
  console.log(sideRef.value)
})

</script>

<style scoped lang="scss">
@import "@/assets/styles/views/live/room.scss"
</style>