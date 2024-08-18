<template>
  <el-card>
    <div>
      <el-table
        :data="tableData"
        :span-method="objectSpanMethod"
        border
        show-summary
        style="width: 100%"
      >
        <el-table-column prop="title" width="180" label="评分维度" />
        <el-table-column prop="content" label="评分内容" />
        <el-table-column prop="score" width="80" label="分值" align="center" />
      </el-table>
      <div
        style="
          width: 100%;
          box-sizing: border-box;
          height: 50px;
          border: 1px solid #eceef4;
          line-height: 50px;
          padding-left: 20px;
        "
      >
        注: 评分采用百分制,由各个评委进行评分
      </div>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import type { TableColumnCtx } from 'element-plus'
interface User {
  id: number
  title: string
  content: string
  score: number
}

interface SpanMethodProps {
  row: User
  column: TableColumnCtx<User>
  rowIndex: number
  columnIndex: number
}

let result = [] as any

const arraySpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex,
}: SpanMethodProps) => {
  if (rowIndex % 2 === 0) {
    if (columnIndex === 0) {
      return [1, 2]
    } else if (columnIndex === 1) {
      return [0, 0]
    }
  }
}

let data: User[] = [
  {
    id: 2,
    title: '创意创新(30分)',
    content:
      '方案创新性:是面向数据应用场景中的某一具体问题或缓解提出的解决方案,且搜友提出的方案具有创新性和有效性',
    score: 10,
  },
  {
    id: 3,
    title: '创意创新(30分)',
    content:
      '技术创新性:应用场景业务特点突出情况.在全省乃至全国范围.业务领域内具有创新性.引领性.首创性情况',
    score: 10,
  },
  {
    id: 1,
    title: '方案完整性',
    content: '方案完全符合模版要求,完整,逻辑缜密',
    score: 10,
  },
  {
    id: 4,
    title: '创意创新(30分)',
    content:
      '完整明确:你解决的问题是什么,你的解决方案是什么,你的解决方案如何解决问题,你的解决方案的优势是什么',
    score: 10,
  },
  {
    id: 5,
    title: '技术能力(40分)',
    content:
      '技术多样性,综合运用5G,人工智能,大数据,区块链等技术,技术应用广泛,技术应用深度,技术应用广度',
    score: 10,
  },
  {
    id: 6,
    title: '技术能力(40分)',
    content: '技术安全性:具备应用安全和数据安全保障机制并良好运行',
    score: 10,
  },
  {
    id: 7,
    title: '技术能力(40分)',
    content:
      '技术优势:结合应用场景.详细说明作品设计的算法和技术实现方案,采用算法.开发技术的先进与创新性',
    score: 10,
  },
  {
    id: 8,
    title: '技术能力(40分)',
    content: '运维能力:数据应用的运维运营,升级迭代.推广运行方面实施情况',
    score: 10,
  },
  {
    id: 9,
    title: '应用价值(20分)',
    content: '项目落地:项目应具备落地实施场景及实施情况',
    score: 10,
  },
  {
    id: 10,
    title: '应用价值(20分)',
    content: '示范带动效应:做平的预期应用成果,对行业发展的示范带动效应',
    score: 10,
  },
]

const myCallback = (item: User) => {
  return item.title
}

// 工具函数整理数据
const dataGroupBy = (arr: User[]) => {
  let resultArr = [] as User[]
  result = Object.groupBy(arr, myCallback)
  Object.keys(result).forEach((key) => {
    resultArr = [...resultArr, ...(result[key] as User[])]
  })

  return resultArr.toSorted((a, b) => a.id - b.id)
}

const objectSpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex,
}: SpanMethodProps) => {
  if (columnIndex === 0) {
    // 当前列为第一列则永远不会执行进入这个条件,因为第一行数据前面没有数据
    if (rowIndex > 0 && row.title === tableData[rowIndex - 1].title) {
      // 当前行的姓名与前一行相同，则合并行
      return { rowspan: 0, colspan: 0 }
    } else {
      // TODO: 注意该条件会被先执行,因为第一行的的数据一定不会被合并会保持数据完整
      // 当前行的姓名与前一行不同，则计算当前行的姓名在数组中的索引
      const index = tableData.findIndex((item) => item.title === row.title)
      // 从当前行开始向下查找，直到找到姓名不同的行为止
      let rowspan = 1
      // 计算需要向下合并的行数
      for (let i = index + 1; i < tableData.length; i++) {
        if (tableData[i].title === row.title) {
          rowspan++
        } else {
          break
        }
      }
      // 返回合并行数和列数
      return { rowspan, colspan: 1 } //意思是第一列合并rowspan行
    }
  }
}

const tableData = dataGroupBy(data)
</script>

<style lang="scss" scoped></style>
