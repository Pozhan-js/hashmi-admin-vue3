<template>
  <div>
    <!-- <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="amount1" label="Amount 1" />
      <el-table-column prop="amount2" label="Amount 2" />
      <el-table-column prop="amount3" label="Amount 3" />
    </el-table> -->

    <el-table
      class="my-table"
      :show-header="false"
      show-overflow-tooltip
      row-class-name="row-name"
      @row-click="handleClickRow"
      :row-style="{ border: 'none' }"
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      :border="false"
      default-expand-all
    >
      <el-table-column
        class="text-[18px] font-bold"
        prop="date"
        sortable
        width="200"
      ></el-table-column>
      <el-table-column sortable width="160">
        <template #default="{ row }">
          <div class="flex items">
            <el-button type="primary" link @click="() => {}">编辑</el-button>
            <el-button type="primary" link @click="() => {}">
              新增子目录
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { computed, h, ref } from 'vue'
import type { VNode } from 'vue'
import type { TableColumnCtx } from 'element-plus'
import { id } from 'element-plus/es/locale'

interface Product {
  id: string
  name: string
  amount1: string
  amount2: string
  amount3: number
}

interface SpanMethodProps {
  row: Product
  column: TableColumnCtx<Product>
  rowIndex: number
  columnIndex: number
}

interface SummaryMethodProps<T = Product> {
  columns: TableColumnCtx<T>[]
  data: T[]
}
const filterMap = ref<any>({})
const setData = ref<any>([])

const currentId = ref(0)
const previousElement = ref<HTMLElement | null>(null)

const handleClickRow = (row: any, column: any, event: Event) => {
  const target = event.target as HTMLElement
  if (!target) return
  // el-table__row

  // 重置之前保存的元素的颜色
  if (previousElement.value && previousElement.value !== target) {
    previousElement.value.style.color = ''
  } else {
    target.style.setProperty('color', 'red', 'important')
  }
}

const getSummaries = (param: SummaryMethodProps) => {
  const { columns, data } = param
  const sums: (string | VNode)[] = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = h('div', { style: { textDecoration: 'underline' } }, [
        '合计',
      ])
      return
    }
    const values = data.map((item: any) => Number(item[column.property]))
    console.log(values)

    if (!values.every((value) => Number.isNaN(value))) {
      sums[index] = `$ ${values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!Number.isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)}`
    } else {
      sums[index] = 'N/A'
    }
  })

  return sums
}

const filterTable = () => {
  let result = setData.value.reduce((acc: any, cur: any) => {
    cur[acc.name] = []
    if (acc.name === cur.name) {
      cur[acc.name].push(acc)
    }
  }, {})

  console.log(result)
}

const objectSpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex,
}: SpanMethodProps) => {
  if (columnIndex === 0) {
    if (row.name === 'Tom') {
      if (row.id === '12987122') {
        return {
          rowspan: 3,
          colspan: 1,
        }
      } else {
        return {
          rowspan: 0,
          colspan: 0,
        }
      }
    }
  }
}

// const filterKey = (key: string) => {
//   return computed(() => {
//     let count = tableData.value.filter((item: any) => {
//       return item.name === key
//     }).length

//     console.log(count)

//     return count
//   })
// }

interface User {
  id: number
  date: string
  hasChildren?: boolean
  children?: User[]
}

// 表格数据
const tableData: User[] = [
  {
    id: 3,
    date: '我上学的',
    children: [
      {
        id: 31,
        date: '1-100000000000',
      },
      {
        id: 32,
        date: '1-22222222222',
      },
      {
        id: 33,
        date: '1-3',
      },
    ],
  },
  {
    id: 4,
    date: '识字',
    children: [
      {
        id: 35,
        date: '1-1',
      },
      {
        id: 36,
        date: '1-2',
      },
      {
        id: 37,
        date: '1-3',
        children: [
          {
            id: 45,
            date: '1-3-1',
          },
          {
            id: 46,
            date: '1-3-2',
          },
          {
            id: 47,
            date: '1-3-34444444444444444444444444444',
          },
        ],
      },
    ],
  },
]

// const tableData = ref<Product[]>([
//   {
//     id: '12987122',
//     name: 'Tom',
//     amount1: '234',
//     amount2: '3.2',
//     amount3: 10,
//   },
//   {
//     id: '12987123',
//     name: 'Tom',
//     amount1: '165',
//     amount2: '4.43',
//     amount3: 12,
//   },
//   {
//     id: '12987124',
//     name: 'Tom',
//     amount1: '324',
//     amount2: '1.9',
//     amount3: 9,
//   },
//   {
//     id: '12987125',
//     name: 'Tom1',
//     amount1: '123',
//     amount2: '3.3',
//     amount3: 9,
//   },
//   {
//     id: '12987126',
//     name: 'Tom2',
//     amount1: '621',
//     amount2: '2.2',
//     amount3: 17,
//   },
//   {
//     id: '12987127',
//     name: 'Tom3',
//     amount1: '539',
//     amount2: '4.1',
//     amount3: 15,
//   },
// ])
</script>

<style scoped lang="scss">
// 树形table
:deep(.el-table__row--level-0) {
  background-color: #f0f6ff;
}
/* 去掉表格单元格边框 */
:deep(.el-table td.el-table__cell),
:deep(.el-table th.el-table__cell.is-leaf) {
  border-bottom: none;
}

.red {
  color: red !important;
}
</style>
