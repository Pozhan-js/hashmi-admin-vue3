<template>
  <div>
    <router-view v-if="!isLock"></router-view>
    <transition v-if="isLock && $route.name !== 'login'" name="slide-up">
      <ScreenLock />
    </transition>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'

import { computed, provide } from 'vue'
import { useTheme } from './hooks/useTheme'
import { useScreenLockStore } from '@/store/modules/screenLock'

provide('$echarts', echarts)
// 锁屏
const screenLockStore = useScreenLockStore()
const isLock = computed(() => screenLockStore.isLocked)
// 初始化主题配置
const { initTheme } = useTheme()
initTheme()
</script>
