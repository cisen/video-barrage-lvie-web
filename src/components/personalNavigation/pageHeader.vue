<template>
  <div class="page-header  animate__animated animate__slideInDown animate__faster" >
    <SvgIcon :name="iconNmae" class="icon"></SvgIcon>
    <span>{{title}}</span>
    <div class="whiteWhale">
    
    </div>
  </div>
</template>


<script setup lang="ts">
defineProps({
  title: String,
  iconNmae: String
})
</script>
<style scoped lang="scss">
@import "./style/pageHeader.scss";
</style> 