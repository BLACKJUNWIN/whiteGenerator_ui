<template>
  <span style="margin:0 5px">
    <span v-if="props.mode==='default'">
      <el-button :type="type" :size="size">
        <slot></slot>
      </el-button>
    </span>
    <span v-if="props.mode==='plain'">
      <el-button :type="type" plain :size="size">
        <slot></slot>
      </el-button>
    </span>
  </span>
</template>

<script setup>
//定义参数
const props = defineProps({
  mode: {
    type: String,
    default: "default", //默认值
    validator: function (value) {
      return ["default", "plain"].includes(value);
    },
  },
  type: {
    type: String, //参数类型
    default: "primary", //默认值
    validator: function (value) {
      return ["primary", "success", "warning", "danger"].includes(value);
    },
  },
  size:{
    type: String,
    default:"normal",
    validator: function (value) {
      return ["small", "normal", "large"].includes(value);
    },
  }
})
</script>

<style scoped>

</style>