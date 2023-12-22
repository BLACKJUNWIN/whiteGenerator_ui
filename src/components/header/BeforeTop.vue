<template>
  <div style="width: 100%;box-shadow: 0 0 8px rgba(128,128,128,0.56);">
    <el-menu
        :default-active="data.activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        style="height: 100px;width: 100%;padding: 0 5%"
    >
      <el-menu-item index="/before/home" @click="router.push('/before/home')">
        <img src="../../../public/logo.png" style="height: 50px;margin-right: 10px" alt="logo">
        <strong style="font-size: 20px">
          <span style="color: #99cccc">Generator</span>&nbsp;<span style="color: #ffc269">Co</span><span style="color: #1c6bbc">d</span><span style="color: forestgreen">e</span>
        </strong>
      </el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="/before/generator" @click="router.push('/before/generator')"><strong style="font-size: 20px">代码生成</strong></el-menu-item>
      <el-menu-item index="/before/back" @click="router.push('/before/back')"><strong style="font-size: 20px">后台管理</strong></el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router/dist/vue-router";
const route=useRoute();
const router=useRouter();
let data=reactive({
  activeIndex:"",
})

watch(route,(newPath)=>{
  changeActive(newPath.path);
})

onMounted(()=>{
  changeActive(route.path);
})

const changeActive=(path)=>{
  if(path.includes("/before/back")){
    data.activeIndex="/before/back";
  }else{
    data.activeIndex=path;
  }

}
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>