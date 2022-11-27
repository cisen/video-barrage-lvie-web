<template>
  <el-row class="row">
    <el-col :span="1"><div class="grid-content ep-bg-purple" /> </el-col>
    <el-col :span="12">
      <div class="grid-content ep-bg-purple-light" />
      <div class="live-choose">
        <el-menu
          :default-active="globaStore.globalData.router.currentRouter"
          class="el-menu"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="/"> 直播 </el-menu-item>
          <el-menu-item index="/主机"> 主机 </el-menu-item>
          <el-menu-item index="/手游"> 手游 </el-menu-item>
          <el-menu-item index="/娱乐"> 娱乐 </el-menu-item>
        </el-menu>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="search">
        <el-input
          v-model="searchText"
          class="w-50 m-2"
          size="large"
          placeholder="Please Input"
          :prefix-icon="Search"
        />
      </div>
    </el-col>
    <el-col :span="6">
      <RightSide></RightSide>
    </el-col>
    <el-col :span="1"><div class="grid-content ep-bg-purple" /> </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import RightSide from "./rightSide/rightSide.vue";
import { useGlobalStore } from "@/store/main";
import { useRouter } from "vue-router";
import { Search } from "@element-plus/icons-vue";
import { ref } from "vue";

components: {
  RightSide;
}

const globaStore =  useGlobalStore()
const router = useRouter();
const searchText = ref("");

//选项卡点击
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
  router.push(key);
};
</script>

<style scoped lang="scss">
@import "./style/topNavigation.scss";
</style>
