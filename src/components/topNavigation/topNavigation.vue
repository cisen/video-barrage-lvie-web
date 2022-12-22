<template>
  <el-row :class="{ row: true, bgColorBlack: scrollTopNotTop, bgColorWhite: !scrollTopNotTop }">
    <el-col :span="1">
      <div class="grid-content ep-bg-purple" />
    </el-col>
    <el-col :span="12">
      <div class="grid-content ep-bg-purple-light" />
      <div class="live-choose">
        <el-menu :default-active="globaStore.globalData.router.currentRouter" class="el-menu" mode="horizontal"
          @select="handleSelect">
          <el-menu-item :style="{ color: scrollTopNotTop ? color : '#18191C' }" index="/"> 直播 </el-menu-item>
          <el-menu-item :style="{ color: scrollTopNotTop ? color : '#18191C' }"> 主机 </el-menu-item>
          <el-menu-item :style="{ color: scrollTopNotTop ? color : '#18191C' }"> 手游 </el-menu-item>
          <el-menu-item :style="{ color: scrollTopNotTop ? color : '#18191C' }"> 娱乐 </el-menu-item>
        </el-menu>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="search" v-show="displaySearch">
        <el-input v-model="searchText" class="w-50 m-2" size="large" placeholder="Please Input" :prefix-icon="Search" />
      </div>
    </el-col>
    <el-col :span="6">
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
  window.addEventListener('scroll', scrollTop, true)
})

</script>

<style scoped lang="scss">
@import "./static/style/topNavigation.scss";
</style>
