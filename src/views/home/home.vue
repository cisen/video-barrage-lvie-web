<template>
  <div class="mian">
    <div class="head">
      <topNavigation color="#fff" :displaySearch="false"></topNavigation>
    </div>
    <!-- 封面图 -->
    <div class="cover-picture">
    </div>

    <!-- 顶部通道 热门分类 -->
    <div class="header-channel">
      <!-- 左边部分 -->
      <div class="header-channel-left">
        <div class="channel-left-item">
          <div class="channel-left-icon bg-orange">
            <SvgIcon name="dynamic" class="icon" color="#fff"></SvgIcon>
          </div>
          <div class="channel-left-item-title">动态</div>
        </div>
        <div class="channel-left-item">
          <div class="channel-left-icon bg-pink">
            <SvgIcon name="flame" class="icon" color="#fff"></SvgIcon>
          </div>
          <div class="channel-left-item-title">热门</div>
        </div>
        <div class="channel-left-item">
          <div class="channel-left-icon bg-green">
            <SvgIcon name="channel" class="icon" color="#fff"></SvgIcon>
          </div>
          <div class="channel-left-item-title">频道</div>
        </div>
      </div>
      <!-- 中间部分 -->
      <div class="header-channel-right">
        <div class="channel-right-box-left">
          <div class="right-box-left-item" v-for="item in 24">
            番剧
          </div>
        </div>

        <div class="channel-right-box-right">
          <div class="right-box-right-item" v-for="item in 6">
            <SvgIcon name="columnInformation" class="icon" color="#61666D"></SvgIcon>
            <span>专栏</span>
          </div>
        </div>
      </div>

    </div>
    <!-- 主体 -->
    <div class="middle">
      <!-- 轮播图 -->
      <div class="carousel">
        <el-carousel indicator-position="none" arrow="never" height="520px">
          <el-carousel-item v-for="item in list" :key="item">
            <div>
              <div class="carousel-img-box">
                <img class="carousel-img" :src="item.src" />
                <div class="carousel-bottom"></div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 视频 -->
      <div class="video-card" v-for="item in 16">
        <Card :roomID="30"></Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/homeVideoList/card.vue"
import topNavigation from "@/components/topNavigation/topNavigation.vue"
import { reactive } from "vue";

components: {
  Card
  topNavigation
}
const list = reactive([
  // { src: "https://eraser-go-live.oss-cn-hangzhou.aliyuncs.com/assets/static/img/articleContribution/e41fd63193dbde45f822733e148d30facc1d05dc14dc163a20fe72bdf6fc8c2a.jpg" },
  { src: "/src/assets/img/temporary/adasdasd.png" },
])
</script>

<style scoped lang="scss">
@import "@/assets/styles/views/home/home.scss";
</style>
