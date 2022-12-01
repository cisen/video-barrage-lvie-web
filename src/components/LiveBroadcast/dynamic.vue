<template>
    <div class="dynamic">
    
        <div class="dynamic-list">
            <!-- 单个卡片 -->
            <div  :class="{ mouseover : isMouseover ,mouseleave: !isMouseover}" class="dynamic-item shadow-box "  @mouseover="mouseOver" @mouseleave="mouseleave">
                <div class="item-image">
                    <img src="@/assets/img/temporary/Sara11666527482073253.png" class="el-image__inner"
                        style="object-fit: cover;">
                </div>
                <div class="item-text">
                    <div class="post-meta">
                        <SvgIcon name="camera" class="icon-small"></SvgIcon> " 发布于 2022-08-21 13:48:56 "
                    </div>
                    <h3>生活倒影 | 我的个人博客</h3>
                    <div class="post-meta" style="margin-bottom: 15px;">
                        <SvgIcon name="hot" class="icon-small"></SvgIcon>
                        <span>
                             921 热度
                        </span>
                        <SvgIcon name="comments" class="icon-small"></SvgIcon>
                        <span>
                             5 条评论
                        </span>
                        <SvgIcon name="like" class="icon-small"></SvgIcon> 
                        <span>
                            0 点赞
                        </span>
                    </div>
                    <div class="recent-post-desc">
                        从2021年6月16日开始搭建项目,至2022年8月21日,已经过去一年有余。期间曾因为换工作而暂停几个月 </div>
                    <div class="sort-label"><span style="margin-right: 12px;"> 生活倒影 </span><span>被偷走的那几年 </span></div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">

import { ref } from 'vue';

const isMouseover = ref(false)

const mouseOver = () => {
    isMouseover.value = true
}
const mouseleave = () => {
    isMouseover.value = false
}
</script>
<style scoped lang="scss">
@import "./style/dynamic.scss"
</style>