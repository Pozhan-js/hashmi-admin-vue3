<template>
  <div class="modal">
    <div class="box">
      <div class="text">{{ msg }}</div>
      <button class="btn" @click="emit('click')" type="primary">确定</button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['click'])
defineProps({
  msg: {
    type: String,
    required: true,
    default: 'Hello World',
  },
})
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #00000050;
  display: flex;
  flex-wrap: wrap;
  place-content: center;
}

.box {
  background-color: #fff;
  color: #333;
  padding: 10em 20em;
  border-radius: 10px;
  box-shadow: 0 0 3px #00000080;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  background-color: #5a9cf8;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
