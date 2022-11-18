<template>

    <div @mouseover="mouseOver" @mouseleave="mouseleave"
        :class="{ item : true , mouseover : isMouseover ,mouseleave: !isMouseover}">
        <div class="head">
            <div class="item-image"></div>
            <div class="classification">视频唱见</div>
        </div>
        <div class="info">
            <div>
                <el-avatar class="avatar"
                    src="http://127.0.0.1:8080/assets/static/img/users/headPortrait/uploaded/userID301668347075612126200.jpg" />
            </div>
            <div class="info-text">
                <p class="live-titel">别问 问就是18岁</p>
                <div class="bottom-info">
                    <spen class="username">橡皮擦哈哈</spen>
                    <div>
                        <img src="./static/img/eyes.png" alt="eyes">
                        <span>1421</span>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref } from "vue"

const isMouseover = ref(false)

const mouseOver = () => {
    isMouseover.value = true
}
const mouseleave = () => {
    isMouseover.value = false
}

</script>

<style scoped lang="scss">
@import "./static/style/card.scss"
</style>