<!--
 * @Author: 朽木白
 * @Date: 2023-06-30 08:39:20
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-30 08:43:46
 * @Description: 锁屏
-->

<template>
  <div class="btn">
    <el-tooltip content="锁屏">
      <el-button circle @click="onLock">
        <el-icon><Lock /></el-icon>
      </el-button>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { useScreenLockStore } from '@/store/modules/screenLock'

const screenLockStore = useScreenLockStore()
const onLock = () => {
  screenLockStore.setLock(true)
}
</script>

<style scoped lang="scss">
.btn {
  margin-right: 20px;
  cursor: pointer;
  transition: all 0.3s;
}
</style>
