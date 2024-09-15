<!-- <template>
  <div>
    <ag-grid-vue
      :rowData="rowData"
      :columnDefs="colDefs"
      style="height: 500px"
      class="ag-theme-quartz"
      :pagination="true"
    ></ag-grid-vue>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { AgGridVue } from 'ag-grid-vue3' // Vue Data Grid Component

const rowData = ref([])
const colDefs = ref([
  { field: 'mission', flex: 3 },
  { field: 'company', flex: 1 },
  { field: 'location', flex: 2 },
  { field: 'date', flex: 1 },
  { field: 'price', flex: 1 },
  { field: 'successful', flex: 1 },
  { field: 'rocket', flex: 2 },
])
onMounted(async () => {
  rowData.value = await fetchData()
})

const fetchData = async () => {
  const response = await fetch(
    'https://www.ag-grid.com/example-assets/space-mission-data.json',
  )
  return response.json()
}

// const rowData = ref([
//   { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
//   { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
//   { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
// ])

// // Column Definitions: Defines the columns to be displayed.
// const colDefs = ref([
//   { field: 'make' },
//   { field: 'model' },
//   {
//     field: 'price',
//     valueFormatter: (p: any) => '$' + p.value.toLocaleString(),
//   },
//   { field: 'electric' },
// ])
</script>

<style scoped></style> -->

<template>
  <div class="draggable-table">
    <el-table
      ref="tableRef"
      :data="tableData.data"
      :key="'table' + tableData.key"
      @header-dragend="handleHeaderDragend"
      border
      style="width: 100%"
    >
      <template v-for="item of tableData.columnList">
        <el-table-column
          show-overflow-tooltip
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <!-- <template #default="{ row }">
            <div class="container overflow-cell">
              <a href="https://www.baidu.com" class="overflow-cell">
                {{ row }}
              </a>
            </div>
          </template> -->
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import { nextTick, onMounted, reactive, ref } from 'vue'
import Sortable from 'sortablejs'

const tableData = reactive({
  key: new Date().getTime(),
  data: [
    {
      id: 'id',
      name: 'name',
      amount1: 'amount1',
      amount2: 'amount2',
      amount3: 'amount3',
      amount4: 'amount4',
    },
    {
      id: '12987123',
      name: 'Tom',
      amount1: '165',
      amount2: '4.43',
      amount3: 12,
      amount4: 'amount4',
    },
    {
      id: '12987124',
      name: 'Tom',
      amount1: '324',
      amount2: '1.9',
      amount3: 9,
      amount4: 2,
    },
    {
      id: '12987125',
      name: 'Tom',
      amount1: '621',
      amount2: '2.2',
      amount3: 17,
      amount4: 122222222222222222222222222222222222222222222222222,
    },
    {
      id: '12987126',
      name: 'Tom',
      amount1: '539',
      amount2: '4.1',
      amount3: 15,
      amount4: 22,
    },
  ],
  columnList: [
    {
      label: 'ID',
      prop: 'id',
      width: '180',
    },
    {
      label: 'Name',
      prop: 'name',
      width: '180',
    },
    {
      label: 'Amount1',
      prop: 'amount1',
      width: '180',
    },
    {
      label: 'Amount2',
      prop: 'amount2',
      width: '180',
    },
    {
      label: 'Amount3',
      prop: 'amount3',
      width: '180',
    },
    {
      label: 'Amount4',
      prop: 'amount4',
      width: '180',
    },
    {
      label: 'Amount5',
      prop: 'amount5',
      width: '180',
    },
  ],
})
const tableRef = ref()
let sortable: Sortable
onMounted(() => {
  initTableHeaderDrag() // 初始化拖拽事件
})

function initTableHeaderDrag() {
  if (sortable) {
    sortable.destroy()
  }
  let el = tableRef.value.$el.querySelector('.el-table__header-wrapper tr')
  sortable = Sortable.create(el, {
    animation: 150,
    onEnd(evt: any) {
      const oldItem = tableData.columnList[evt.oldIndex]
      tableData.columnList.splice(evt.oldIndex, 1)
      tableData.columnList.splice(evt.newIndex, 0, oldItem)
      tableData.key = new Date().getTime() // 变更key，强制重绘table。如果不强制变更的话，会出现一些奇奇怪怪的问题，列宽度调整也会出现问题
      nextTick(() => {
        initTableHeaderDrag() // 因为table被强制重新绘制，因此需要重新监听
      })
    },
  })
}
function handleHeaderDragend(
  newWidth: string,
  oldWidth: string,
  column: any,
  even: any,
) {
  for (let item of tableData.columnList) {
    if (item.label == column.label) {
      item.width = newWidth as string
    }
  }
  initTableHeaderDrag() // 重新注册，防止变更宽度后无法拖动
}
</script>
<style scoped lang="scss">
.draggable-table {
  width: 100%;
}

.container {
  width: 100%;
  // overflow: hidden;
}

.overflow-cell {
  display: block;
  /*超出隐藏*/
  overflow: hidden;
  /*禁止换行*/
  white-space: nowrap;
  /*超出用省略号代替*/
  text-overflow: ellipsis;
}
</style>
