<template>
  <div>
    <video id="videoElement" class="" controls autoplay muted>
    </video>
    <button @click="play">播放</button>
  </div>
</template>


<script setup lang="ts">
import flvJs from 'flv.js'

const play = () => {
  if (flvJs.isSupported()) {
    let videoElement = document.getElementById('videoElement');
    let flvPlayer;
    flvPlayer = flvJs.createPlayer({
      type: 'flv',
      isLive: true,
      hasAudio: false,
      url: 'http://127.0.0.1:7001/live/30.flv'
    });
    flvPlayer.attachMediaElement(videoElement as any as HTMLMediaElement);
    flvPlayer.load();
    flvPlayer.play();  
    return flvPlayer
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/views/live/room.scss";
</style>
