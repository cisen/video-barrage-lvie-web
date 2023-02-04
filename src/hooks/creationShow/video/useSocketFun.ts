import {  VideoInfo } from "@/types/creationShow/video/video";

import { Ref, UnwrapNestedRefs } from "vue";

//在线观看人数
export const numberOfViewers = (liveNumber: Ref<number>, people: number) => {
    liveNumber.value = people
}

//有人发送弹幕
export const responseBarrageNum = (info:  UnwrapNestedRefs<VideoInfo>)  => {
    info.videoInfo.barrageNumber++
}