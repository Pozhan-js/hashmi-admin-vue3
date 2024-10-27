<template>
  <div>夸标签通信</div>
  <!-- 
  <div class="item">
    <span>item</span>
  </div>
  <div class="item">
    <span>item</span>
  </div>
  <div class="item">
    <span>item</span>
    <p>vvvv</p>
  </div>
  <div class="item">
    <p class="xx">item</p>
  </div>
  <div class="item">
    <i>item</i>
  </div>
  <p>1</p>
  <p>2</p>
  <p>3</p> -->
  <!-- <div class="box">Div Element</div>
  <span class="box">Span Element</span>
  <div class="box">Div Element</div> -->
  <!-- 
  <div class="box">Div Element</div>
  <div class="box">Dive Element</div>
  <div class="divider">Divider</div>
  <div class="box">Dive Element</div>
  <div class="box">Dive Element</div>
  <span class="divider">Divider</span> -->

  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
  <div class="box circle"></div>
  <div class="box"></div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
$color: green;
.item:has(> span + p) {
  color: $color;
  font-weight: 500;
  background-color: aqua;

  p {
    color: red;
    background-color: yellow;
  }
}

// span:only-of-type {
//   color: blue;
// }

.divider:not(:has(~ .divider)):not(.divider ~ *) {
  color: red;
}

// .divider:not(:has(~ .divider)):not(.divider ~ *) {
//   color: red;
// }
.box {
  width: 100px;
  height: 100px;
  background-color: blue;
  margin: 10px;
}

.box:not(.circle) {
  width: 100px;
  height: 100px;
  background-color: red;
  border-radius: 50%;
}
</style>
