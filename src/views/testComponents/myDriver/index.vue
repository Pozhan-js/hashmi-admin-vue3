<template>
  <div>
    <el-button class="page-header" type="primary" style="margin: 20px">
      Page Header
    </el-button>
    <el-button class="top-nav" style="margin: 20px">Top Nav</el-button>
    <el-button class="sidebar" style="margin: 20px">Sidebar</el-button>
    <el-button class="footer" style="margin: 20px">Footer</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

const driverObj = driver({
  popoverClass: 'driverjs-theme',
  //   allowClose: false, //禁止点击外部关闭
  showProgress: true,
  //   overlayColor: '#fde047',//蒙版背景
  nextBtnText: '下一步 —›', //下一步按钮
  prevBtnText: '‹— 上一步', //上一步按钮
  doneBtnText: '完成', //完成按钮
  progressText: '{{current}} / {{total}}',
  stagePadding: 10,
  steps: [
    {
      element: '.page-header',
      popover: {
        title: `<div style="color:#333;text-align:center;font-size:14px"> 
            步骤 <div style="display: inline-block;color:#fff;font-size:12px;width: 16px;height: 16px;line-height: 16px;text-align: center;border-radius: 50%;background-color:#1678FF;"> 1 </div> 新增目录 
            </div>`,
        description: `<p style="color:#333;text-align:center;font-size:12px">点击上方新增目录</p>`,
        side: 'bottom',
        align: 'start',
        showButtons: ['next', 'close'], //设置单个步骤按钮显示
        nextBtnText: '下一步 —›',
      },
    },
    {
      element: '.top-nav',
      popover: {
        title: 'Title',
        description: 'Description',
        side: 'right',
        align: 'start',
      },
    },
    {
      element: '.sidebar',
      popover: {
        title: 'Title',
        description: 'Description',
        side: 'top',
        align: 'center',
      },
    },
    {
      element: '.footer',
      popover: { title: 'Title', description: 'Description' },
    },
  ],
})

onMounted(() => {
  driverObj.drive()
})
</script>

<style lang="scss">
// 弹窗样式
.driver-popover.driverjs-theme {
  background-color: #fff;
  padding: 10px;
  color: #000;
}
.driver-popover.driverjs-theme .driver-popover-title {
  font-size: 14px;
  margin-top: 20px;
}

.driver-popover.driverjs-theme button {
  flex: 1;
  margin: 0 10px;
  //   flex-shrink: 0;
  text-align: center;
  background-color: #4e87f7;
  color: #fff;
  text-shadow: none;
  font-size: 14px;
  padding: 5px 8px;
  border-radius: 6px;
  margin: 0 auto;
}

.driver-popover.driverjs-theme .driver-popover-close-btn {
  padding: 5px;
  background-color: transparent;
  color: #9b9b9b;
}

.driver-popover.driverjs-theme .driver-popover-close-btn:hover {
  color: #000;
}

.driver-popover.driverjs-theme .driver-popover-footer {
  position: relative;
}

.driver-popover.driverjs-theme
  .driver-popover-footer
  .driver-popover-progress-text {
  position: absolute;
  top: -83px;
}

// .driver-popover.driverjs-theme .driver-popover-footer .driver-popover-next-btn {
//   width: 160px;
//   //   flex-shrink: 0;
// }

// .driver-popover.driverjs-theme .driver-popover-title,
// .driver-popover.driverjs-theme .driver-popover-description,
// .driver-popover.driverjs-theme .driver-popover-progress-text {
//   color: #000;
// }

// .driver-popover.driverjs-theme button:hover {
//   background-color: #000;
//   color: #ffffff;
// }

// .driver-popover.driverjs-theme .driver-popover-navigation-btns {
//   justify-content: space-between;
//   gap: 3px;
//   background-color: #fde047;
// }

// .driver-popover.driverjs-theme
//   .driver-popover-arrow-side-left.driver-popover-arrow {
//   border-left-color: #fde047;
// }

// .driver-popover.driverjs-theme
//   .driver-popover-arrow-side-right.driver-popover-arrow {
//   border-right-color: #fde047;
// }

// .driver-popover.driverjs-theme
//   .driver-popover-arrow-side-top.driver-popover-arrow {
//   border-top-color: #fde047;
// }

// .driver-popover.driverjs-theme
//   .driver-popover-arrow-side-bottom.driver-popover-arrow {
//   border-bottom-color: #fde047;
// }

// .driver-popover.driverjs-theme .driver-popover-next-btn {
//   background-color: #fde047;
// }
</style>
