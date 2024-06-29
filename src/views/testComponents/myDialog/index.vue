<template>
  <div class="controller">
    <el-button type="primary" @click="clickHandler">显示弹窗</el-button>
  </div>
</template>

<script setup>
import showMessage from '../../../utils/showMessage'
const clickHandler = () => {
  showMessage('显示信息', (close) => {
    console.log('点击了确定')
    close()
  })
}
</script>

<style lang="scss" scoped>
.controller {
  display: flex;
  column-gap: 20px;
  justify-content: center;
}
</style>
