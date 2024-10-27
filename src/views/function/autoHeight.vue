<template>
  <div>
    <!-- <div class="m-4" v-adaptive="{ bottom: 20 }">
      <div
        style="height: 30px; padding: 10px; background-color: cyan"
        v-for="item in 20"
        :key="item"
      >
        item {{ item }}
      </div>
    </div> -->
    <!-- 一行超出隐藏 -->
    <div class="text">
      <el-tooltip
        effect="dark"
        content="不安于小成，然后足以成大器；不诱于小利，然后可以立远功。"
        placement="top"
      >
        <div v-tooltip:single="[100, 1]">
          不安于小成，然后足以成大器；不诱于小利，然后可以立远功。
        </div>
      </el-tooltip>
    </div>
    <!-- 两行超出隐藏 -->
    <div class="text" v-tooltip:multiple="[200, 2]">
      <el-tooltip
        class="box-item"
        effect="dark"
        content="不安于小成，然后足以成大器；不诱于小利，然后可以立远功。"
        placement="top-start"
      >
        不安于小成，然后足以成大器；不诱于小利，然后可以立远功。不安于小成，然后足以成大器；不诱于小利，然后可以立远功。
      </el-tooltip>
    </div>
    <!-- 三行超出隐藏 -->
    <div class="text" v-tooltip:multiple="[100, 3]">
      不安于小成，然后足以成大器；不诱于小利，然后可以立远功。
    </div>

    <!-- <div
      v-tooltip="{
        message: '我是一个说明',
        effect: 'dark',
        text: '我有一个说明文字',
      }"
    > -->
    <!-- </div> -->
    <!-- <div
      style="
        width: 50px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      "
      v-tooltip="{
        message: '我是一个说明',
        position: 'right',
        text: '我有一个说明文字在右边',
      }"
    >
    </div> -->
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.text {
  width: 300px;
  border: 1px solid #fff;
  /* padding: 3px; */
  border-radius: 5px;
  margin-bottom: 30px;
}
</style>
