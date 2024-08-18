<template>
  <div class="my-form">
    <el-watermark :font="font" :content="['Element+', 'Element Plus']">
      <div style="height: 500px; width: 100%; backgroundcolor: #bfc" />
    </el-watermark>

    <el-input v-focus placeholder="请输入"></el-input>

    <el-tree
      :default-expand-all="true"
      style="max-width: 600px"
      :highlight-current="true"
      :data="data"
      :props="defaultProps"
      @node-click="handleNodeClick"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <div>{{ node.label }}</div>
          <div style="margin-left: 80px">
            <a @click="() => {}">新增子目录</a>
            <a style="margin-left: 8px" @click="() => {}">编辑</a>
          </div>
        </span>
      </template>
    </el-tree>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import { isDark } from '@/composables/dark'

const font = reactive({
  color: '#bfc',
  size: 16,
})

interface Tree {
  label: string
  children?: Tree[]
}

const defaultProps = {
  children: 'children',
  label: 'label',
}
// tree数据
const data: Tree[] = [
  {
    label: '我上学了',
    children: [
      {
        label: '我是中国人',
      },
      {
        label: '我是小学生',
      },
      {
        label: '我爱学语文',
      },
    ],
  },
  {
    label: '识字',
    children: [
      {
        label: '我爱识字',
      },
      {
        label: '我爱学语文',
      },
      {
        label: '我爱学语文',
      },
    ],
  },
]

const handleNodeClick = (data: any) => {
  console.log(data)
}
// watch(
//   isDark,
//   () => {
//     font.color = isDark.value
//       ? 'rgba(255, 255, 255, .15)'
//       : 'rgba(0, 0, 0, .15)'
//   },
//   {
//     immediate: true,
//   },
// )
</script>

<style lang="scss" scoped>
.my-form {
  color: red;
  width: 100%;
  height: 100%;
}

.custom-tree-node {
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
:deep(.el-tree) > .el-tree-node > .el-tree-node__children {
  margin: 10px;
}

:deep(.el-tree)
  > .el-tree-node
  > .el-tree-node__children
  > .el-tree-node
  > .el-tree-node__content {
  padding: 16px 0;
}

// 被选中项样式
:deep(.el-tree) > .el-tree-node .is-current {
  // background-color: #f1f6fe;
  font-weight: bold;
  color: #406de6;
}
</style>
