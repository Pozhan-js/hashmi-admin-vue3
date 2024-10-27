<template>
  <div>
    <div>Other</div>

    <el-button type="primary" @click="lastStep">上一步</el-button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['setName'])
const lastStep = () => {
  emit('setName', 'About')
}
</script>

<style scoped></style>
