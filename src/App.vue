<template>
  <div style="min-width: 900px;min-height: 500px">
    <div class="beforeHeight">
      <router-view/>
    </div>
    <bottom />
  </div>
</template>

<script setup>
import Bottom from "@/components/bottom/bottom";
import {onMounted} from "vue";
//设置屏幕最小高度
onMounted(() => {
  setTimeout(() => {
    let item = document.querySelector(".beforeHeight");
    item.style.minHeight = window.innerHeight + "px";
  }, 100)

})

//解决element-plus表格报错
const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}
const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
}
</script>

<style>
@import "~assets/css/normalize.css";
@import "~assets/css/base.css";
</style>
