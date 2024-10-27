<template>
  <div>
    <div>Home</div>

    <el-button type="info" @click="nextStep">下一步</el-button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['setName'])
const nextStep = () => {
  emit('setName', 'About')
}
</script>

<style scoped></style>
