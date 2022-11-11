<template>
  <div class="mian">
    <div class="head">
      <!-- 顶部直播部分 -->
      <div class="live-part">
      <div class="liv-window">
        <el-row>
        <el-col :span="18">
        <div class="liv-player">
        <video id="videoElement" class="" controls autoplay muted></video>
        
        </div>
        </el-col>
        <el-col :span="4">
        <div class="optional-list">
        <div class="list-item">
        <img  class="item-img" src="@/assets/img/home/background.png" alt="">
        </div>
        <div class="list-item">
        <img  class="item-img" src="@/assets/img/home/background.png" alt="">
        </div>
        <div class="list-item">
        <img  class="item-img" src="@/assets/img/home/background.png" alt="">
        </div>
        <div class="list-item">
        <img  class="item-img" src="@/assets/img/home/background.png" alt="">
        </div>
        </div>
        </el-col>
      </el-row>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import flvJs from "flv.js";
import { onMounted } from "vue";

const play = () => {
  if (flvJs.isSupported()) {
    let videoElement = document.getElementById("videoElement");
    let flvPlayer;
    flvPlayer = flvJs.createPlayer({
      type: "flv",
      isLive: true,
      hasAudio: false,
      url: "http://127.0.0.1:7001/live/30.flv",
    });
    flvPlayer.attachMediaElement((videoElement as any) as HTMLMediaElement);
    // flvPlayer.load()
    // flvPlayer.play()
    return flvPlayer;
  }
};

onMounted : {
  setTimeout(() => {
    play()
  }, 500);
  
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/views/home/home.scss";
</style>
