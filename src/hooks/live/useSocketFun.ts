import { Message, decodeWebClientSendBarrageRes ,decodeWebClientEnterLiveRoomRes ,decodeWebClientHistoricalBarrageRes} from "@/proto/pb/live"
import DPlayer, { DPlayerDanmakuItem } from "dplayer"
import { Ref } from "vue";
export const webClientBarrageDeal = (data: Message, dp: DPlayer, sideRef: Ref<any>) => {
    //格式化消息
    if (!data.data) return;
    const msg = decodeWebClientSendBarrageRes(data.data)
    console.log(msg)
    sideRef.value.addBarrage(msg)
    dp.danmaku.draw(<DPlayerDanmakuItem>{
        text: msg.text,
        color: msg.color,
        type: msg.type,
    });
    console.log(msg)
}

export const webClientEnterLiveRoomDeal = (data: Message, dp: DPlayer, sideRef: Ref<any>) => {
    //格式化消息
    if (!data.data) return;
    const msg = decodeWebClientEnterLiveRoomRes(data.data)
    const list = msg.list
    sideRef.value.updataOnline(list)
    console.log(msg)

}

export const webClientHistoricalBarrageRes = (data: Message, dp: DPlayer, sideRef: Ref<any>) => {
    //格式化消息
    if (!data.data) return;
    const msg = decodeWebClientHistoricalBarrageRes(data.data)
    sideRef.value.addHistoryBarrage(msg)
    console.log(msg)
}