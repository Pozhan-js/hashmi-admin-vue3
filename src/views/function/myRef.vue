<template>
  <div class="container">
    <input v-model="text" />
    <p class="result">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { debounceRef } from './common'

const text = debounceRef('')
</script>

<style scoped></style>
