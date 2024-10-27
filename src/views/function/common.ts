import { computed, customRef } from 'vue'

// 缓存函数
export function cacheComputed(fn: any) {
  const cache = new Map()

  function haveCache(args: any) {
    return cache.get(JSON.stringify(args))
  }

  return function (...args: any) {
    if (haveCache(args)) {
      return haveCache(args)
    }
    let result = computed(() => fn(...args))
    cache.set(JSON.stringify(args), result)

    return result
  }
}

// 自定义ref
export function debounceRef(value: any, delay: number = 1000) {
  let timer: any = null
  return customRef((track, trigger) => ({
    get() {
      // 收集依赖
      track()
      return value
    },
    set(val) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        // 触发更新
        value = val
        trigger()
      }, delay)
    },
  }))
}
