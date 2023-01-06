<template>
  <div class="mian">
    <div class="head">
      <topNavigation color="#fff" :displaySearch="false"></topNavigation>
    </div>
    <!-- 封面图 -->
    <div class="cover-picture">
    </div>
    <div class="middle">
      <div class="recommended">
        <div class="single">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import flvJs from "flv.js";
import Card from "@/components/homeVideoList/card.vue"
import topNavigation from "@/components/topNavigation/topNavigation.vue"

components: {
  Card
  topNavigation
}
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
    flvPlayer.load()
    flvPlayer.play()
    return flvPlayer;
  }
};

onMounted: {
  setTimeout(() => {
    play()
  }, 500);

}
</script>

<style scoped lang="scss">
@import "@/assets/styles/views/home/home.scss";
</style>
