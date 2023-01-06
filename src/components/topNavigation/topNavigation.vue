<template>
  <el-row ref="elRowRef" :class="{ row: true, bgColorBlack: scrollTopNotTop, bgColorWhite: !scrollTopNotTop }" :style="{maxWidth :screenWidth }">
    <el-col :span="1">
      <div class="grid-content ep-bg-purple" />
    </el-col>
    <el-col :span="13">
      <div class="grid-content ep-bg-purple-light" />
      <div class="live-choose">
        <el-menu :default-active="globaStore.globalData.router.currentRouter" class="el-menu" mode="horizontal"
          @select="handleSelect">
          <el-menu-item :style="{ color: scrollTopNotTop ? color : '#18191C' }" index="/"> 视频 </el-menu-item>
          <el-menu-item :style="{ color: scrollTopNotTop ? color : '#18191C' }"> 专栏 </el-menu-item>
          <el-menu-item :style="{ color: scrollTopNotTop ? color : '#18191C' }"> 直播 </el-menu-item>
        </el-menu>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="search" v-show="displaySearch">
        <el-input v-model="searchText" class="w-50 m-2" size="large" placeholder="Please Input" :prefix-icon="Search" />
      </div>
    </el-col>
    <el-col :span="5">
      <RightSide :icon-color="scrollTopNotTop ? color : '#18191C'"></RightSide>
    </el-col>
    <el-col :span="1">
      <div class="grid-content ep-bg-purple" />
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import RightSide from "./rightSide/rightSide.vue";
import { useGlobalStore } from "@/store/main";
import { useRouter } from "vue-router";
import { Search } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import { max } from "lodash";

const emit = defineProps({
  //是否固定颜色
  color: {
    type: String,
    required: false,
    default: '#18191C',
  },
  displaySearch: {
    type: Boolean,
    required: false,
    default: true,
  }
}


)
components: {
  RightSide;
}



const globaStore = useGlobalStore()
const router = useRouter();
const searchText = ref("");
const scrollTopNotTop = ref(true) // 滚动条是否在顶部
const elRowRef = ref()
//屏幕最大宽
const screenWidth = screen.width + 'px'
//选项卡点击
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
  router.push(key);
};
// 实时滚动条高度
const scrollTop = () => {
  let scroll = document.documentElement.scrollTop || document.body.scrollTop;
  if (scroll > 58) {
    scrollTopNotTop.value = false
  } else {
    scrollTopNotTop.value = true
  }
  // console.log(scroll)
}


onMounted(() => {
  // 监听滚动条位置
  // mianRef.value.style.maxWidth = screen.width + "px"
  window.addEventListener('scroll', scrollTop, true)
  console.log(elRowRef.value.style)
})

</script>

<style scoped lang="scss">
@import "./static/style/topNavigation.scss";
</style>
