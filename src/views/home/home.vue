<template>
  <div class="mian">
    <div class="head">
      <topNavigation color="#fff" :displaySearch="false"></topNavigation>
    </div>
    <!-- 封面图 -->
    <div class="cover-picture">
    </div>
    <!-- 顶部通道 热门分类 -->
    <homeHeaderChannel></homeHeaderChannel>
    <!-- 主体 -->
    <div class="middle">
      <!-- 轮播图 -->
      <homeRotograph :rotograph="homeInfo?.rotograph"></homeRotograph>
      <!-- 视频 -->
      <div class="video-card" v-for="videoInfo in homeInfo.videoList">
        <Card :id="videoInfo.id" :title="videoInfo.title" :username="videoInfo.username"
          :video_duration="videoInfo.video_duration" v-bind:barrage-number="videoInfo.barrageNumber"
          :heat="videoInfo.heat" :cover="videoInfo.cover" :created_at="videoInfo.created_at"
          ></Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/homeVideoList/card.vue"
import homeHeaderChannel from "@/components/homeHeaderChannel/homeHeaderChannel.vue"
import topNavigation from "@/components/topNavigation/topNavigation.vue"
import homeRotograph from "@/components/homeRotograph/homeRotograph.vue"
import { getHomeInfoRequist } from "@/apis/home";
import { Ref, onMounted, ref } from "vue";
import { getHomeInfoRes } from "@/types/home/live";

components: {
  homeRotograph
  Card
  homeHeaderChannel
  topNavigation
}

let homeInfo = ref<getHomeInfoRes>({
  rotograph: [],
  videoList: []
})

const init = async (homeInfo: Ref<getHomeInfoRes>) => {
  const response = await getHomeInfoRequist()
  if (response.data)
    homeInfo.value = response.data
}

onMounted(() => {
  init(homeInfo)
})

</script>

<style scoped lang="scss">
@import "@/assets/styles/views/home/home.scss";
</style>
