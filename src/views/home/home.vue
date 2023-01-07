<template>
  <div class="mian">
    <div class="head">
      <topNavigation color="#fff" :displaySearch="false"></topNavigation>
    </div>
    <!-- 封面图 -->
    <div class="cover-picture">
    </div>
    <!-- 主体 -->
    <div class="middle">
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
