<template>
  <div>
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      placeholder="Please input"
      @select="handleSelect"
      @blur="cancelSelect"
    >
      <template #loading>
        <svg class="circular" viewBox="0 0 50 50">
          <circle class="path" cx="25" cy="25" r="20" fill="none" />
        </svg>
      </template>
    </el-autocomplete>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { debounce } from './utile'

const state = ref('')

interface LinkItem {
  value: string
  link: string
}

const links = ref<LinkItem[]>([])

const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' },
  ]
}

const querySearchAsync = debounce(
  (queryString: string, cb: (arg: any) => void) => {
    const results = queryString
      ? links.value.filter(createFilter(queryString))
      : links.value
    cb(results)
  },
  1000,
)

const createFilter = (queryString: string) => {
  return (restaurant: LinkItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}

const cancelSelect = () => {
  console.log('取消')
  querySearchAsync.cancel()
}

const handleSelect = (item: Record<string, any>) => {
  console.log(item)
}

onMounted(() => {
  links.value = loadAll()
})
</script>

<style scoped></style>
