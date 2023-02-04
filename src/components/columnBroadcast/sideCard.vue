<template>
    <div class="card-list">
        <div class="author-card">
            <div class="avatar"><el-avatar :size="100"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" /></div>
            <div class="author-name"><span>橡皮擦</span></div>
            <div class="column-info">
                <div class="column-info-item">
                    <div> <span>文章</span></div>
                    <div class="info-num"><span>11</span></div>
                </div>
                <div class="column-info-item">
                    <div><span>分类</span></div>
                    <div class="info-num"><span>4</span></div>
                </div>
            </div>
            <a class="fo-github">
                Follow Me
            </a>
        </div>

        <div class="classification-card">
            <div class="card-title">分类</div>
            <div v-for="item in classificationList" class="classification-item">
            <span>{{ item.name }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>import { reactive } from 'vue';



const classificationList = reactive([
    {'name' : "生活倒影"},
    {'name' : "学习人生"},
    {'name' : "游戏娱乐"},
    {'name' : "视听盛宴"},
    ])
</script>

<style lang="scss" scoped>
@import "./static/style/sideCard.scss";

</style>