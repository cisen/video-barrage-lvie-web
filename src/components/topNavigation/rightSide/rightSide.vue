<template>
  <div class="info">
    <div class="avatar">
      <router-link to="/personal">
        <el-avatar :size="36" :src="userInfo.userInfoData.photo" />
      </router-link>
    </div>
    <!-- iocn -->
    <div class="icon-list">
      <div class="icon-item">
        <SvgIcon name="message" class="icon" :color="iconColor"></SvgIcon>
        <p :style="{ color: iconColor }">消息</p>
      </div>

      <div class="icon-item">
        <SvgIcon name="dynamic" class="icon" :color="iconColor"></SvgIcon>
        <p :style="{ color: iconColor }">动态</p>
      </div>

      <div class="icon-item">
        <SvgIcon name="history" class="icon" :color="iconColor"></SvgIcon>
        <p :style="{ color: iconColor }">历史</p>
      </div>

      <div class="icon-item" @click="jump('Creation')">
        <SvgIcon name="creation" class="icon" :color="iconColor"></SvgIcon>
        <p :style="{ color: iconColor }"> 创作</p>
      </div>

    </div>

    <el-button type="primary" round @click="dialogTableVisible = !dialogTableVisible">开始直播</el-button>
    <el-dialog v-model="dialogTableVisible" :lock-scroll="false" class="dialog" center title="Begin to live">
      <el-steps :active="nextIndex">
        <el-step title="准备工作" description="Download tool" />
        <el-step title="设置参数" description="Set the parameters" />
        <el-step title="开始直播" description="Start to live" />
      </el-steps>

      <el-row class="steps">
        <el-col :span="18">
          <div class="steps-left">
            <p v-show="nextIndex == 1">下载 OBS Studio 直播工具, 安装到我的电脑打开</p>
            <div v-show="nextIndex == 2">
              <h4>Adders : {{ userInfo.userInfoData.liveData.address }}</h4>
              <h4>
                key : {{ liveKeyDesensitization(userInfo.userInfoData.liveData.key) }}
                <el-button @click="copy(userInfo.userInfoData.liveData.key)" class="copy" color="#626aef" size="small"
                  plain round>
                  copy
                </el-button>
              </h4>
            </div>
            <p v-show="nextIndex == 3">配置完成！开始直播咯~</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="steps-right">
            <el-button type="primary" @click="nextStep">
              <span v-show="nextIndex < 3">下一步</span>
              <span v-show="nextIndex == 3">完成</span>
              <el-icon class="el-icon--right">
                <ArrowRight />
              </el-icon>
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ArrowRight } from "@element-plus/icons-vue";
import { useRouter } from "vue-router"
import { liveKeyDesensitization } from "@/utils/conversion/stringConversion";
import { getLiveRoom } from "@/apis/live";
import { ref, onMounted } from "vue";
import { useUserStore } from "@/store/main";
import useClipboard from "vue-clipboard3";
import { ElNotification } from "element-plus";

const userInfo = useUserStore();
const router = useRouter()
const dialogTableVisible = ref(false);
let nextIndex = ref(1);

const emit = defineProps({
  iconColor: {
    type: String,
    default: '#18191C',
  }
}
)

const nextStep = () => {
  if (nextIndex.value >= 3) {
    dialogTableVisible.value = !dialogTableVisible.value;
    //关窗动画结束后修改
    setTimeout(() => {
      nextIndex.value = 1;
    }, 1000);
  } else {
    nextIndex.value = nextIndex.value + 1;
  }
};

//跳转
const jump = (name: string) => {
  router.push({
    name
  })
}

const getLiveRoomInfo = async () => {
  try {
    if (!userInfo.userInfoData.liveData.address && !userInfo.userInfoData.liveData.key) {
      const data = await getLiveRoom();
      userInfo.userInfoData.liveData.address = data.data?.address || "";
      userInfo.userInfoData.liveData.key = data.data?.key || "";
    }
  } catch (err) {
    console.log(err);
  }
};

const { toClipboard } = useClipboard();

const copy = async (text: string) => {
  try {
    await toClipboard(text); //实现复制
    ElNotification({
      title: "Success",
      message: "复制成功",
      type: "success",
    });
    console.log("Success");
  } catch (e) {
    console.error(e);
  }
};


onMounted: {
  getLiveRoomInfo();
}
</script>

<style scoped lang="scss">
@import "../style/rightSide.scss";
</style>
