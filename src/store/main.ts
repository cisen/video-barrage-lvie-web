import { defineStore } from 'pinia'
import { reactive } from "vue"
import { userInfoRes } from '@/types/login/login'
import { userInfo, global } from '@/types/store/main'

export const useUserStore = defineStore("user", () => {
    const userInfoData = reactive<userInfo>({
        id: 0,
        userName: "",
        photo: "",
        token: "",
        liveData:{
            address:"",
            key :""
        }
    })
    const setUserInfo = (info: userInfoRes) => {
        userInfoData.userName = info.username
        userInfoData.id = info.id
        userInfoData.photo = info.photo
        userInfoData.token = info.token

    }
    return {
        userInfoData,
        setUserInfo
    }
}, {
    persist: true, 
},)

export const useGlobalStore = defineStore("global", () => {
    const globalData = reactive<global>({
        router:{
            currentRouter : ""
        },
        loading: {
            loading: false,
            loadingText: "努力加载中!",
            loadingBackground: "rgba(122, 122, 122, 0.3)",
            loadingSvg: `
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" stroke="#fff">
            <g fill="none" fill-rule="evenodd" stroke-width="2">
            <circle cx="22" cy="22" r="1">
            <animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/>
            <animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/>
            </circle>
            <circle cx="22" cy="22" r="1">
            <animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/>
            <animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/>
            </circle>
            </g>
            </svg>
            `,
            loadingSvgViewBox: "-10, -10, 50, 50",

        }
    })

    const setGlobalLoading = (boll: boolean) => {
        globalData.loading.loading = boll
    }



    return {
        globalData,
        setGlobalLoading
    }

})

