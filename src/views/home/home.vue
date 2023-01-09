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
      <div class="carousel">
        <el-carousel ref="carouselRef" arrow="never" height="520px" :autoplay="false">
          <el-carousel-item v-for="item in list" :key="item">
            <div>
              <div class="carousel-img-box">
                <img class="carousel-img" :src="item.src" />
                <div class="carousel-bottom">
                  <div class="carousel-title">绝美非遗绒花，超强梦幻联动！</div>
                  <div class="toggle-button">
                    <div class="button-item">
                      <SvgIcon name="rightArrow" class="arrow-icon rotation" color="#fff" @click="carouselSwitch(false)">
                      </SvgIcon>
                    </div>
                    <div class="button-item">
                      <SvgIcon name="leftArrow" class="arrow-icon" color="#fff" @click="carouselSwitch(true)"></SvgIcon>
                    </div>
                  </div>
                </div>
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
import homeHeaderChannel from "@/components/homeHeaderChannel/homeHeaderChannel.vue"
import topNavigation from "@/components/topNavigation/topNavigation.vue"
import { reactive, ref } from "vue";

components: {
  Card
  homeHeaderChannel
  topNavigation
}

const carouselRef = ref()
const list = reactive([
  // { src: "https://eraser-go-live.oss-cn-hangzhou.aliyuncs.com/assets/static/img/articleContribution/e41fd63193dbde45f822733e148d30facc1d05dc14dc163a20fe72bdf6fc8c2a.jpg" },
  { src: "/src/assets/img/temporary/adasdasd.png" },
  { src: "/src/assets/img/temporary/adasdasd.png" },
  { src: "/src/assets/img/temporary/adasdasd.png" },
])

//切换轮播图 true 下一张 false 上一张
const carouselSwitch = (is: boolean) => {
  if (is) {
    carouselRef.value.next()

  } else {
    carouselRef.value.prev()
  }

}
</script>

<style scoped lang="scss">
@import "@/assets/styles/views/home/home.scss";
</style>
