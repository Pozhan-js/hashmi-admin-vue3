import { computed } from 'vue'

export default function useVModel(prop: any, propName: string, emit: any) {
  return computed({
    get() {
      return new Proxy(prop[propName], {
        set(target, key, value) {
          emit('update:modelValue', { ...target, [key]: value })
          return true
        },
      })
    },
    set(value) {
      emit('update:' + propName, value)
    },
  })
}
