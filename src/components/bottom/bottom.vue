<template>
  <div class="bl-bottom" style="display: none;background-color: #202a42;color: white;text-align: center;height:100px;width: 100%;line-height: 100px;margin-top:30px">
    2023 © BlackYun.cn
    <a href="https://beian.miit.gov.cn/" target="_blank" style="color: white;text-decoration: none;margin-left: 30px">湘ICP备2021009442号</a>
  </div>
</template>

<script setup>

import {onMounted} from "vue";

onMounted(()=>{
  setTimeout(()=>{
    document.querySelector(".bl-bottom").style.display="block";
  },100)
})
</script>

<style scoped>
</style>