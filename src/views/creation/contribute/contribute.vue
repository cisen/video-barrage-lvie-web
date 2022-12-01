<template>
    <div class="content-box">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="视频投稿" name="first"><videoContribution></videoContribution></el-tab-pane>
            <el-tab-pane label="专栏投稿" name="second">专栏投稿</el-tab-pane>
        </el-tabs>
    </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import videoContribution  from '@/views/creation/contribute/contributePage/vdeoContribution.vue'

components:{
    videoContribution
}
const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
</script>
<style scoped lang="scss">
.content-box{
    height: 100%;
    width: 100%;

    :deep(.el-tabs__nav){
        padding: 1rem 1rem 1rem 4rem;
    }

}
</style>