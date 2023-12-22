<template>
  <div>
    <before-top/>
    <router-view v-slot="{ Component }"  style="margin-top:20px">
      <keep-alive>
        <component :is="Component"/>
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup>
import BeforeTop from "@/components/header/BeforeTop"
</script>

<style scoped>

</style>