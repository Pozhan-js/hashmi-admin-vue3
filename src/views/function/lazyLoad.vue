<script setup>
import { ref, nextTick } from 'vue'
import { ElMessage } from 'element-plus'

const data = ref([])
const countList = ref([...Array(100).keys()]) // 示例数据
const count = ref(0)

const lazyLoad = () => {
  let container
  let bottom

  nextTick(() => {
    container = document.querySelector('.container')
    bottom = document.querySelector('.bottom')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 加载更多数据
            console.log('加载更多数据')
            data.value.push(
              ...countList.value.slice(count.value * 8, (count.value + 1) * 8),
            )
            ElMessage.success('加载成功')
            count.value += 1
          }
        })
      },
      {
        root: container,
        threshold: 1, // 确保标记元素完全可见
      },
    )

    observer.observe(bottom)
  })
}

// 调用 lazyLoad 函数
lazyLoad()
</script>

<template>
  <div class="container">
    <div v-for="item in data" :key="item" class="item">{{ item }}</div>
    <div class="bottom">加载更多...</div>
  </div>
</template>

<style>
.container {
  height: 400px;
  overflow-y: scroll;
}

.item {
  height: 50px;
  border: 1px solid #ccc;
  margin: 5px 0;
}

.bottom {
  height: 50px;
  text-align: center;
  line-height: 50px;
}
</style>
