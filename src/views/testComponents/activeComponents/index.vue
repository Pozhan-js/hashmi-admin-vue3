<template>
  <div>
    <span>动态组件....</span>

    <Transition name="slide-up">
      <component
        v-if="defaultComponents.type"
        :is="comMap[defaultComponents.type as keyof typeof comMap]"
        @setName="setCurrentComName"
      ></component>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, reactive } from 'vue'
import Home from './components/Home.vue'
import About from './components/About.vue'
import Other from './components/Other.vue'

const comMap = shallowRef({
  Home: Home,
  About: About,
  Other: Other,
})

let defaultComponents = reactive({
  type: 'Home',
})

const setCurrentComName = (name: string) => {
  console.log(name)

  defaultComponents.type = name
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
</style>
