<template>
    <!-- :@mouseover="mouseOver" @mouseleave="mouseleave" -->
    <div :class="{ item: true }" @click="jump()">
        <div :class="{ normal: true, mouseleave: !isMouseover }" v-show="!isMouseover">
            <div class="head">
                <div class="item-image"></div>
                <div class="classification">
                    <div class="classification-left">
                        <span class="play-volume">
                            <SvgIcon name="video" class="icon" color="#fff"></SvgIcon>
                            <span>21.8万</span>
                        </span>
                        <span class="barrage-number">
                            <SvgIcon name="barrageNumber" class="icon" color="#fff"></SvgIcon>
                            <span>342</span>
                        </span>
                    </div>
                    <div class="classification-right">
                        <span>11:21</span>
                    </div>


                </div>
            </div>
            <div class="info">
                
            </div>
        </div>
        <!-- 鼠标移入显示 -->
        <!-- animate__animated animate__pulse -->
        <!-- <div :class="{ change: true, mouseover: isMouseover }" v-show="isMouseover">
            <div class="head">
                <div class="item-image"></div>
                <div class="classification">视频唱见</div>
            </div>
            <div class="info">
                <div>
                    <el-avatar class="avatar"
                        src="http://127.0.0.1:8080/assets/static/img/users/headPortrait/uploaded/d30ae0db2d3b6d5d0a83389191820ac2081a8db64e141c05bf9ee0b3e1cf856d.jpg" />
                </div>
                <div class="info-text">
                    <p class="live-titel">别问 问就是18岁</p>
                    <div class="bottom-info">
                        <span class="username">橡皮擦哈哈</span>
                        <div>
                            <el-button type="primary" size="small" round>
                                关注
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->

    </div>
</template>

<script setup lang="ts">

import { ref, defineProps } from "vue"
import { useRouter } from "vue-router"


const emit = defineProps({
    roomID: {
        type: Number,
        required: true,
    }
}
)

const router = useRouter()
const isMouseover = ref(false)

//鼠标聚焦事件
// const mouseOver = () => {
//     isMouseover.value = true
// }
// const mouseleave = () => {
//     isMouseover.value = false

// }

const jump = () => {
    router.push({ name: "liveRoom", query: { roomID: emit.roomID } })
}

</script>

<style scoped lang="scss">
@import "./static/style/card.scss";
</style>