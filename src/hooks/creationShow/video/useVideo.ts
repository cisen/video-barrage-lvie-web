import DPlayer, { DPlayerDanmaku } from "dplayer";
import Swal from 'sweetalert2'
import globalScss from "@/assets/styles/global/export.module.scss"
import { reactive, Ref, ref } from "vue";
import flvJs from "flv.js";
import { decodeMessage } from "@/proto/pb/live"
import { webClientBarrageDeal, webClientEnterLiveRoomDeal, webClientHistoricalBarrageRes, webError } from "@/hooks/live/useSocketFun"
import { useRoute, RouteLocationNormalizedLoaded, useRouter, Router } from "vue-router"
import { useUserStore } from "@/store/main";


export const useVideoProp = () => {
    const route = useRoute()
    const router = useRouter()
    const videoRef = ref()
    const userStore = useUserStore()
    const videoID = ref<number>(0)
  
    return {
      route,
      router,
      videoRef,
      userStore,
      videoID
    }
  }

export const useInit = async (videoRef: Ref, route: RouteLocationNormalizedLoaded, Router: Router, videoID: Ref<Number>,) => {
    try {
      //绑定房间
      // if (!route.query.videoID) {
      //   Router.back()
      //   Swal.fire({
      //     title: "访问房间失败",
      //     heightAuto: false,
      //     confirmButtonColor: globalScss.colorButtonTheme,
      //     icon: "error",
      //   })
      //   Router.back()
      //   return
      // }
      // videoID.value = Number(route.query.roomID)
      //初始化播放器
      console.log(videoRef)
      const dp = new DPlayer({
        container: videoRef.value, // 容器
        loop: true, // 循环播放
        lang: "zh-cn", // 语言，可选'en', 'zh-cn', 'zh-tw',
        logo: "", // 在左上角展示一个logo
        danmaku: true as unknown as DPlayerDanmaku, //官方文档给的就是true 但是ts中规定类型不一致取的取舍方案
        apiBackend: {
          read: function (options) {
            console.log('Pretend to connect WebSocket');
            options.success([]);
          },
          send: function (options) {
            console.log('Pretend to send danmaku via WebSocket', options.data);
            options.success();
          },
        },
        mutex: false, // 互斥，阻止多个播放器同时播放
        video: { // 视频信息
          type: "customFlv", // 视频类型 可选"auto", "hls", "flv", "dash"..
          url: "http://127.0.0.1:7001/live/30.flv", // 视频链接
          customType: {
            customFlv: (video: any, player: any) => {
              const flvPlayer = flvJs.createPlayer({
                type: "flv",
                isLive: true,
                hasAudio: false,
                url: "https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv",
              });
              flvPlayer.attachMediaElement(video);
              flvPlayer.load();
            }
          },
        },
      });
      return dp
    } catch (err) {
      console.log(err)
    }
  }