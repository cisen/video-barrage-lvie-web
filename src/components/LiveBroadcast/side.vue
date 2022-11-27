<template>
    <div class="left-box" width="200px">
        <el-tabs v-model="activeName" stretch class="demo-tabs" @tab-click="handleClick">
            <!-- 弹幕留言 -->
            <el-tab-pane label="弹幕留言" name="first">
                <div class="barrage">
                    <div>
                        <div class="barrage-msg-list">
                            <div v-for="barrageItem in dataList.baeeage" :key="barrageItem.msg_id">
                                <div class="barrage-msg-left" v-if="userInfo?.id != barrageItem.user_id">
                                    <el-avatar shape="circle" :size="34" :src="barrageItem.avatar" />
                                    <div class="msg-text">
                                        <span class="msg-span">{{ barrageItem.text }}</span>
                                    </div>
                                </div>
                                <div class="barrage-msg-right" v-if="userInfo?.id == barrageItem.user_id">
                                    <div class="msg-text">
                                        <span class="msg-span">{{ barrageItem.text }}</span>
                                    </div>
                                    <el-avatar shape="circle" :size="34" :src="barrageItem.avatar" />
                                </div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div class="barrage-send">
                        <el-input v-model="barrage" resize="none" />
                        <el-button v-removeFocus type="primary" @click="sendMesage" :icon="Check" :disabled="!barrage"
                            circle />
                    </div>
                </div>
            </el-tab-pane>
            <!-- 在线人数 -->
            <el-tab-pane label="在线用户" name="second">
                <div class="online">
                    <div class="online-list">
                        <div class="online-item" v-for="onlineItem in dataList.online" :key="onlineItem.user_id">
                            <div class="online-info">
                                <el-avatar shape="circle" :size="38" :src="onlineItem.avatar" />
                                <span class="username">{{ onlineItem.username }}</span>
                            </div>

                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">
import { sideData } from "./types/side";
import { Check } from "@element-plus/icons-vue";
import { ElNotification, TabsPaneContext } from "element-plus";
import { ref, defineEmits, reactive } from "vue";
import { encodeProtoFormat } from "@/utils/proto/proto";
import { WebClientSendBarrageReq, encodeWebClientSendBarrageReq, EnterLiveRoom , WebClientHistoricalBarrageRes} from "@/proto/pb/live";
import { WebClientSendBarrageRes } from "@/proto/pb/live";
import { vRemoveFocus } from "@/utils/customInstruction/focus";

defineProps({
    userInfo: Object,
});

const emit = defineEmits(["sendMessage"]);
const activeName = ref("first");

const dataList = <sideData>reactive({
    baeeage: [],
    online: [],
});
const barrage = ref("");

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event);
};

const sendMesage = () => {
    if (!barrage.value) {
        ElNotification.success({
            title: "Warning",
            message: "",
            offset: 70,
        });
        return;
    }
    const msg = encodeProtoFormat(
        "webClientBarrageReq",
        encodeWebClientSendBarrageReq(<WebClientSendBarrageReq>{
            text: barrage.value,
            color: "#fff",
            type: "right",
        })
    );

    barrage.value = "";
    // console.log(emit("sendMessage"))
    emit("sendMessage", msg);
};

defineExpose({
    addBarrage(msg: WebClientSendBarrageRes) {
        dataList.baeeage = [...dataList.baeeage, msg];
    },
    addHistoryBarrage(msg: WebClientHistoricalBarrageRes) {
        if(!msg.list) return false;
        dataList.baeeage = [...dataList.baeeage, ...msg.list.reverse()];
    },
    updataOnline(online: Array<EnterLiveRoom>) {
        dataList.online = online
    },
});
</script>

<style scoped lang="scss">
@import "./style/side.scss";
</style>
