<template>
  <el-card>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="name" label="产品名" />
      <el-table-column prop="price" label="价格" />
      <el-table-column
        prop="count"
        width="280"
        label="数量"
        align="center"
        #default="{ row }"
      >
        <el-row>
          <el-col class="flex">
            <el-button
              type="primary"
              :icon="Plus"
              @click="() => row.count++"
            ></el-button>
            <div>{{ row.count }}</div>
            <el-button
              type="primary"
              :icon="Delete"
              @click="() => row.count--"
            ></el-button>
          </el-col>
        </el-row>
      </el-table-column>
      <el-table-column label="总价" align="center">
        <template #default="{ row }">
          {{ getTotal(row) }}
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'
import { cacheComputed } from './common'
interface TableData {
  name: string
  price: number
  count: number
}
const tableData = reactive([
  {
    name: 'iphone',
    price: '6000',
    count: '2',
  },
  {
    name: 'macBook',
    price: '12000',
    count: '1',
  },
  {
    name: 'iPad',
    price: '8000',
    count: '2',
  },
  {
    name: 'iWatch',
    price: '3000',
    count: '2',
  },
  {
    name: 'AirPods',
    price: '1990',
    count: '2',
  },
])
// 改造成缓存函数
const handlePricer = (row: TableData) => {
  console.log('函数执行了')

  return row.price * row.count
}

const getTotal = cacheComputed(handlePricer)
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
