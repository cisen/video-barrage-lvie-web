<template>
    <div class="live-info">
        <div class="avatar">
            <el-avatar :size="38" :src="src" />
        </div>
        <div class="info">
            <div class="info-left">
                <p class="live-titel"> {{ titel }} </p>
            </div>
            <div class="info-right">
                <el-button type="primary" round>
                    <SvgIcon name="focus" class="icon"></SvgIcon> 订阅
                </el-button>
            </div>
        </div>
    </div>
</template>


<script setup  lang="ts">

defineProps({
    src: {
        type: String,
        required: true,
    },
    titel: {
        type: String,
        required: true,
    },
 }
)

</script>


<style scoped lang="scss">
@import "./style/liveHeader.scss"
</style>