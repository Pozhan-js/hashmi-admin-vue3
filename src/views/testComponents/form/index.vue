<template>
  <div class="my-form">
    <el-watermark :font="font" :content="['Element+', 'Element Plus']">
      <div style="height: 500px; width: 100%; backgroundcolor: #bfc" />
    </el-watermark>

    <el-input v-focus placeholder="请输入"></el-input>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import { isDark } from '@/composables/dark'

const font = reactive({
  color: '#bfc',
  size: 16,
})

// watch(
//   isDark,
//   () => {
//     font.color = isDark.value
//       ? 'rgba(255, 255, 255, .15)'
//       : 'rgba(0, 0, 0, .15)'
//   },
//   {
//     immediate: true,
//   },
// )
</script>

<style lang="scss" scoped>
.my-form {
  color: red;
  width: 100%;
  height: 100%;
}
</style>
