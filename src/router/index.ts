import { createWebHistory, createRouter } from "vue-router";
import { useUserStore , useGlobalStore} from "@/store/main";


import {ElMessage} from "element-plus";

import liveRouter from "@/router/live";
import personalRouter  from "@/router/personal";
import  creation from "@/router/creation"
import  creationShow from "@/router/creationShow"
const routes = [
    {
        path: '',
        name: 'Home',
        meta: {
          title: '首页',
          requireAuth: false,
          keepAlive: false
        },
        component: () => import('@/views/home/home.vue')
    },
    {
        path: "/",
        name: "Index",
        component: () => import('@/views/Layout.vue'),
        children:[

            ...personalRouter,
            ...liveRouter,
        ]
    },
    {
        path: "/creation",
        name: "Creation",
        component: () => import('@/views/creation/Layout.vue'),
        children:[
            ...creation
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component:() => import('@/views/404.vue'),
        
    }, 
    {
        path: "/login",
        name: "Login",
        component: () => import('@/views/login/login.vue'),
    },
    ...creationShow
     
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach((to, from,next) => {
    const globalStore = useGlobalStore()
    globalStore.globalData.router.currentRouter = to.path
    if(to.path !== "/login"){
        let  userInfo = useUserStore();
        if (userInfo.userInfoData.id == 0 ){
            ElMessage({
                message: '请先登入',
                type: 'error',
            })
            next({name : "Login"})
            return
        }
    }

    next()
})

export default router;
