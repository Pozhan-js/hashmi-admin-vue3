<template>
  <div>
    <div>About</div>

    <el-button type="primary" @click="lastStep">上一步</el-button>
    <el-button type="info" @click="nextStep">下一步</el-button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['setName'])
const lastStep = () => {
  emit('setName', 'Home')
}
const nextStep = () => {
  emit('setName', 'Other')
}
</script>

<style scoped></style>
