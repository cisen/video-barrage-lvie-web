<template>
  <!-- 全局loading -->
  <div
  class="global-loading"
    v-loading="global.globalData.loading.loading"
    :element-loading-text="global.globalData.loading.loadingText"
    :element-loading-svg="global.globalData.loading.loadingSvg"
    :element-loading-svg-view-box="global.globalData.loading.loadingSvgViewBox"
    :element-loading-background="global.globalData.loading.loadingBackground"
  >
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "./store/main";

const global = useGlobalStore();
</script>
<style lang="scss">
@import "@/style.scss";
</style>
