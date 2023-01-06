<template>
  <!-- 全局loading -->
  <div class="parcel">
    <div ref="mianRef" class="global-loading" v-loading="global.globalData.loading.loading"
      :element-loading-text="global.globalData.loading.loadingText"
      :element-loading-svg="global.globalData.loading.loadingSvg"
      :element-loading-svg-view-box="global.globalData.loading.loadingSvgViewBox"
      :element-loading-background="global.globalData.loading.loadingBackground">
      <router-view />
    </div>
  </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useGlobalStore } from "./store/main";

const global = useGlobalStore();

const mianRef = ref()

onMounted(() => {
  //设置最大宽不超过屏幕高度
  mianRef.value.style.maxWidth = screen.width + "px"
}) 
</script>
<style lang="scss">
@import "@/style.scss";
</style>
