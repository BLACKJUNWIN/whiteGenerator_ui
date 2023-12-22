<template>
  <div style="display: flex">
    <el-menu style="flex: none;"
        :default-active="data.activeIndex"
        class="el-menu-vertical-demo"
    >
      <el-menu-item index="/before/back/file" @click="router.push('/before/back/file')">
        <el-icon><Memo /></el-icon>
        <span>模板文件管理</span>
      </el-menu-item>
      <el-menu-item index="/before/back/path" @click="router.push('/before/back/path')">
        <el-icon><Tickets /></el-icon>
        <span>模板路径管理</span>
      </el-menu-item>
      <el-menu-item index="/before/back/record" @click="router.push('/before/back/record')">
        <el-icon><Finished /></el-icon>
        <span>生成记录管理</span>
      </el-menu-item>
      <el-menu-item index="/before/back/user" @click="router.push('/before/back/user')">
        <el-icon><User /></el-icon>
        <span>用户管理</span>
      </el-menu-item>
    </el-menu>
    <div style="flex: auto;margin:0 30px">
      <h2 style="text-align: center">{{route.name}}</h2>
      <router-view/>
    </div>
  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router/dist/vue-router";
import {onMounted, reactive} from "vue";

const router=useRouter();
const route=useRoute();
let data=reactive({
  activeIndex:"",
})

onMounted(()=>{
  data.activeIndex=route.path;
})
</script>

<style scoped>

</style>