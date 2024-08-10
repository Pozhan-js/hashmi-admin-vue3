import { computed } from 'vue'

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
