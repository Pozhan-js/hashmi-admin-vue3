<template>
  <el-card>
    <div class="header">
      <el-button type="primary" @click="refresh">重新加载</el-button>
    </div>
    <TransitionGroup name="list" tag="div" class="waterfall-box">
      <div class="water-container">
        <div class="body">
          <div
            class="waterfall-item"
            v-for="(item, index) in config.list"
            :key="item.id"
          >
            <img
              class="pic"
              :src="item.photo"
              alt=""
              :ref="e => setItemStyle(e as any, index)"
            />
            <div class="title">{{ item.title }}</div>
            <div class="content text-ellipsis text-ellipsis-2">
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </el-card>
</template>

<script setup lang="ts">
import { reactive, onMounted, onUnmounted } from 'vue'
import { useRequest, type ItemList } from './hooks'

const { getList, defaultPic } = useRequest()

const config = reactive({
  loading: false,
  column: 4,
  move: true,
  list: [] as ItemList,
})

function setItemStyle(img: HTMLImageElement, index: number) {
  if (!img) return
  function update() {
    const item = img.parentElement
    if (!item) return
    const gapRows = index >= config.column ? config.column * 2 : 0
    const rows = Math.ceil(item.clientHeight / 2) + gapRows
    item.style.gridRowEnd = `span ${rows}`
  }
  update()
  img.onload = update
  img.onerror = function () {
    img.src = defaultPic.data
    update()
  }
}

async function getData(reset = false) {
  config.loading = true
  const res = await getList(20)
  config.loading = false
  if (res.code === 1) {
    if (reset) {
      config.list = res.data
    } else {
      config.list = config.list.concat(res.data)
    }
  }
}

const refresh = () => {
  getData(true)
}

let observer: ResizeObserver
onMounted(() => {
  refresh()
  let el = document.querySelector('.body')! as HTMLElement
  observer = new ResizeObserver((entries) => {
    const rect = entries[0].contentRect // 获取目标元素的内容区域尺寸
    console.log(rect.width, rect.height)
    if (rect.width > 1000) {
      config.column = 4
    } else if (rect.width > 600) {
      config.column = 3
    } else if (rect.width > 400) {
      config.column = 2
    }

    el.style.setProperty('--column', config.column.toString())
  })

  observer.observe(el)
})

onUnmounted(function () {
  // 停止监听
  observer.disconnect()
})
</script>

<style lang="scss" scoped>
.header {
  height: 50px;
}

.water-container {
  background-color: #f5f5f5;
  color: white;
  border-radius: 5px;

  .body {
    --column: 4;
    display: grid;
    grid-template-columns: repeat(var(--column), 1fr);
    grid-gap: 0 20px;
    padding: 20px;
    // grid-auto-rows: 2px;
    align-items: end;

    .waterfall-item {
      background-color: #fff;
      margin-bottom: 20px;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
      padding: 10px;
      display: flex;
      flex-direction: column;
      transition: all 0.3s;

      &:hover {
        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.24);
        transform: scale(0.98);
      }

      .pic {
        display: block;
        width: 100%;
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 14px;
      }

      .title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 8px;
        color: black;
      }

      .content {
        font-size: 14px;
        color: #222;
        line-height: 1.4;
        width: fit-content;
        display: flex;
      }
    }
  }
}

.group-move,
.group-enter-active,
.group-leave-active {
  transition: 0.8s all;
}

.group-enter-from,
.group-leave-to {
  opacity: 0;
  transform: translate3d(0px, 30px, 0);
}

.group-leave-active {
  position: absolute;
}
</style>
