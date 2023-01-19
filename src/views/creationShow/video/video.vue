<template>
    <div class="video-page">
        <!-- 主题内容 -->
        <div class="video-content">
            <!-- 左边部分 -->
            <div class="content-left">
                <div class="vidoe-info">
                    <div class="vidoe-title">
                        【卢克文工作室】“荒漠屠夫”惠然翻车事件，揭露经济链潜规则！
                    </div>
                    <div class="video-data">
                        <div class="video-data-list">
                            <span class="data-item">
                                <SvgIcon name="video" class="icon" color="#9499A0"></SvgIcon> 1245
                            </span>
                            <span class="data-item">
                                <SvgIcon name="barrageNumber" class="icon" color="#9499A0"></SvgIcon> 45
                            </span>
                            <span class="data-item">
                                <SvgIcon name="time" class="icon" color="#9499A0"></SvgIcon> 2023-01-15 17:00:00
                            </span>
                            <span class="data-item">
                                <SvgIcon name="forbid" class="forbid-icon" color="#9499A0"></SvgIcon>未经作者授权，禁止转载
                            </span>

                            <div class="info-right">
                                <el-button type="primary" v-removeFocus :icon="Star" circle />
                                <el-button type="primary" v-removeFocus :icon="Warning" circle />
                                <el-button type="primary" v-removeFocus :icon="Position" circle />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="video-box">
                    <div ref="videoRef" class="player" id="dplay" />
                    <div class="video-sending">
                        <div class="live-info">
                            <span>223 人正在看</span> , <span> 已装填 608 条弹幕 </span>
                        </div>
                        <div class="barrage-set">
                            <SvgIcon name="barrageOn" class="barrage-icon" color="#61666D"></SvgIcon>
                            <div class="barrage-input">
                                <el-input v-model="va" placeholder="发个友善的弹幕见证当下">
                                    <template #append>
                                        <div><el-button type="primary">发送</el-button></div>
                                    </template>
                                </el-input>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <!-- 右边部分 -->
            <div class="content-right">
                <div class="user-card">
                    <div class="card-left">
                        <div class="avatar"> <el-avatar :size="60"
                                src="http://127.0.0.1:8080/assets/static/img/users/headPortrait/uploaded/d30ae0db2d3b6d5d0a83389191820ac2081a8db64e141c05bf9ee0b3e1cf856d.jpg" />
                        </div>
                    </div>

                    <div class="card-right">
                        <div class="username">
                            <sapn>北四环野猪佩奇</sapn>
                            <div class="private-letter">
                                <SvgIcon name="message" class="icon" color="#9499A0"></SvgIcon> 私信
                            </div>
                        </div>
                        <div class="signature"> 月更以上,周更未满。商务合作wx : maguabd</div>
                        <div class="btn-list"><el-button type="primary" size="small" round :icon="House">主页</el-button>
                            <el-button class="attention" type="primary" size="small" round :icon="Plus">关注</el-button>
                        </div>
                    </div>
                </div>


                <div class="barrage-box">
                <div class="barrage-top-navigation">
                <div class="box-left"><span>弹幕列表</span><SvgIcon name="dropDown" class="icon" color="#61666D"></SvgIcon></div>
                <span @click="barrageListShow = !barrageListShow"> <SvgIcon name="rightArrow" class="arrow" color="#61666D"></SvgIcon></span>
               
                </div>
                <div class="barrage-list" :style="{height : barrageListShow ? '700px': '0px' }" >
                    <el-table   :data="tableData"  style="width: 100%">
                        <el-table-column prop="data" label="时间" width="60" />
                        <el-table-column prop="barrage" label="弹幕内容" width="250" />
                        <el-table-column prop="addTime" label="发送时间" />
                    </el-table>
                </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import topNavigation from "@/components/topNavigation/topNavigation.vue"
import { useInit, useVideoProp } from "@/hooks/creationShow/video/useVideo";
import DPlayer from "dplayer";
import { onMounted, reactive, ref } from "vue";
import { Position, Warning, Star, Plus, House } from '@element-plus/icons-vue'
import { vRemoveFocus } from "@/utils/customInstruction/focus"
components: {
    topNavigation
}
const va = ref()

let tableData = reactive([] as Array<{data : number , barrage :string , addTime : string}>)

for(let i = 0 ; i < 1000 ; i++){
    tableData.push({
        data : i,
        barrage : `这是第 : ${i} 条弹幕`,
        addTime : "123"
    })
}

const barrageListShow = ref(true)
var dp: DPlayer //播放器配置对象
const { videoRef, userStore, route, router, videoID } = useVideoProp()

onMounted(async () => {
    dp = await useInit(videoRef, route, router, videoID) as DPlayer
})
</script>

<style lang="scss" scoped>
@import "@/assets/styles/views/creationShow/video/video.scss";
</style>
