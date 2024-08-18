<template>
  <div class="container">
    <div>
      <span>省级地区</span>
      <el-button
        type="primary"
        @click="getChildNode(first.id)"
        v-for="first of firstNode"
        :key="first.id"
      >
        {{ first.name }}
      </el-button>
    </div>

    <div>
      <span>{{ nodeName }}</span>
      <el-button
        type="primary"
        v-for="children of childNode"
        :key="children.id"
      >
        {{ children.name }}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import treeData from '@/data/tree.json'

let tree = ref<any>([])

// 存放一级节点
let firstNode = ref<any>([])

let childNode = ref<any>([])

let nodeName = computed(() => {
  return childNode.value[0]?.name.split('')[childNode.value[0]?.name.length - 1]
})

// 获取子节点
const getChildNode = (id: number) => {
  childNode.value = tree.value.filter((item: any) => item.parent_id === id)

  console.log(
    childNode.value[0].name.split('')[childNode.value[0].name.length - 1],
  )
}

const getFirstNode = () => {
  firstNode.value = tree.value.filter((item: any) => item.parent_id === 0)
}

// 获取树数据
const getTreeData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let res = JSON.parse(JSON.stringify(treeData)).array
      resolve(res)
    }, 300)
  })
}

onMounted(async () => {
  tree.value = await getTreeData()
  // 获取一级节点
  getFirstNode()
  // console.log(firstNode.value)
})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
