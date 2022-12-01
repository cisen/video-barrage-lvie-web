import { createApp } from 'vue'
import { useGlobalStore } from "@/store/main"

import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'animate.css';
import router from "./router/index";
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import svgIcon from "@/components/SvgIcon/index.vue";
import 'virtual:svg-icons-register';


 
const  app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia)
app.use(router)
app.use(ElementPlus)


app.component('svg-icon', svgIcon)

const global = useGlobalStore()
//挂载全局
app.provide('global',{
    global
})

router.isReady().then(() => app.mount('#app')) 
