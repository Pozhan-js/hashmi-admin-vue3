<template>
  <div class="chart-dialog-content">
    <div class="opt-bar">
      <button
        size="mini"
        v-if="playChart == false"
        @click=";(playChart = true), initChart(0)"
      >
        <i class="el-icon-video-play"></i>
        轮播
      </button>
      <button
        size="mini"
        v-if="playChart == true"
        @click=";(playChart = false), initChart(activeIndex)"
      >
        <i class="el-icon-video-pause"></i>
        暂停
      </button>
    </div>
    <section class="bottom">
      <div class="time-line">
        <div
          class="line-item"
          @click="changeChart(index)"
          v-for="(i, index) in timeLineList"
          :key="i"
          :class="{ active: index <= activeIndex, hover: index == activeIndex }"
        >
          <div class="line"></div>
          <div class="point">
            <div class="text">{{ i }}</div>
            <div
              class="icon el-icon-caret-top"
              v-show="index == activeIndex"
            ></div>
          </div>
        </div>
      </div>
      <div class="chart-content" id="chartContent"></div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, inject } from 'vue'
const activeIndex = ref(0)
const myChart = ref<any>(null)
const playChart = ref(true)
const rspData = ref<any>([])
const timeLineList = ref<any>([])
const myTimeoutArr = ref<any>([])
const $echarts: any = inject('$echarts')

const generateRandomData = () => {
  const data = []

  for (let i = 0; i < 100; i++) {
    let month = '2023-'
    month = month + (Math.floor(i / 10) + 1)
    const count = Math.floor(Math.random() * 300) + 100 // 生成100到300的随机整数
    const name = 'count' + (i % 10)
    const avg = Math.floor(Math.random() * 300) + 100
    data.push({
      month,
      count,
      name,
      avg,
    })
    if (!timeLineList.value.includes(month)) {
      timeLineList.value.push(month)
    }
  }

  return data
}

onMounted(() => {
  playChart.value = false
  getData()
})
const getData = () => {
  timeLineList.value = []
  rspData.value = generateRandomData()
  initChart(0)
}
const changeChart = (index: number, flag = false) => {
  playChart.value = flag
  initChart(index)
}
const initChart = (index = 0) => {
  myChart.value?.dispose()
  //清理定时
  myTimeoutArr.value.forEach((item: any) => {
    clearTimeout(item)
  })
  myTimeoutArr.value = []
  // 获取$echarts实例

  myChart.value = $echarts.init(document.querySelector('#chartContent'))
  const updateFrequency = 3000
  const dimension = 1
  const data: any[] = []
  rspData.value.forEach((item: any) => {
    data.push([item.month, item.count, item.name, item.avg])
  })
  const month: any[] = []
  data.forEach((item) => {
    if (month.length === 0 || month[month.length - 1] !== item[0]) {
      month.push(item[0])
    }
  })

  let startIndex = index
  let startMonth = month[startIndex]
  let option: any = {
    grid: {
      top: 10,
      bottom: 30,
      left: 20,
      right: 40,
      containLabel: true,
    },
    xAxis: {
      max: 'dataMax',
      min: function (value: any) {
        return Math.round(value.min) - 10
      },
      axisLabel: {
        formatter: function (n: any) {
          return n
        },
      },
    },
    dataset: {
      source: data.filter(function (item) {
        return item[0] === startMonth
      }),
    },
    yAxis: {
      type: 'category',
      inverse: true,
      axisTick: {
        show: false,
      },

      axisLine: {
        show: true,
        lineStyle: {
          color: '#e2e2e2',
        },
      },
      axisLabel: {
        show: true,
        fontSize: 14,
        formatter: function (value: any) {
          return value
        },
        color: '#8c8c8d',
        rich: {
          flag: {
            fontSize: 25,
            padding: 5,
          },
        },
      },
      animationDuration: 300,
      animationDurationUpdate: 300,
    },
    series: [
      {
        realtimeSort: true,
        seriesLayoutBy: 'column',
        type: 'bar',
        itemStyle: {
          color: function () {
            return '#7ea2f4'
          },
        },
        markLine: {
          symbolSize: 0,
          data: [
            {
              name: '平均分',
              xAxis: Number(
                data.filter(function (item) {
                  return item[0] === startMonth
                })[0][3],
              ),
              lineStyle: {
                color: '#eb7e65',
                type: 'dashed',
              },
              label: {
                show: true,
                color: '#fe4852',
                formatter:
                  '{ll|平均值：' +
                  Number(
                    data.filter(function (item) {
                      return item[0] === startMonth
                    })[0][3],
                  ) +
                  '\n}',
                // distance: [-135, 150],
                // padding: [-50, 0, 50, 0],
                rich: {
                  ll: {
                    fontSize: 16,
                    lineHeight: 22,
                    padding: [40, 0, 0, 0],
                  },
                },
              },
            },
          ],
          animation: false,
        },
        barMaxWidth: 20,
        encode: {
          x: dimension,
          y: 2,
        },
        label: {
          show: true,
          // precision: 1,
          position: 'right',
          valueAnimation: true,
          fontFamily: 'monospace',
        },
      },
    ],
    // Disable init animation.
    animationDuration: 0,
    animationDurationUpdate: updateFrequency,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear',
    // graphic: {
    //     elements: [
    //         {
    //             type: 'text',
    //             right: 0,
    //             bottom: 0,
    //             style: {
    //                 text: startMonth,
    //                 font: 'bolder 24px monospace',
    //                 fill: 'rgba(100, 100, 100, 0.25)'
    //             },
    //             z: 100
    //         }
    //     ]
    // }
  }

  myChart.value.setOption(option)
  activeIndex.value = index
  if (playChart.value) {
    for (let i = startIndex; i < month.length - 1; ++i) {
      let myTimeout = setTimeout(() => {
        updateMonth(month[i + 1])
        activeIndex.value = i + 1
        //播放结束
        if (i == month.length - 2) {
          setTimeout(() => {
            playChart.value = false
          }, updateFrequency)
        }
      }, (i + 1 - startIndex) * updateFrequency)
      myTimeoutArr.value.push(myTimeout)
    }
  }
  function updateMonth(month: any) {
    let source = data.filter(function (item) {
      return item[0] === month
    })
    console.log(source)
    option.series[0].data = source
    option.series[0].markLine = {
      symbolSize: 0,
      data: [
        {
          name: '平均分',
          xAxis: Number(source[0][3]),
          lineStyle: {
            color: '#eb7e65',
            type: 'dashed',
          },
          label: {
            show: true,
            color: '#fe4852',
            formatter: '{ll|平均值：' + Number(source[0][3]) + '\n}',
            rich: {
              ll: {
                fontSize: 16,
                lineHeight: 22,
                padding: [40, 0, 0, 0],
              },
            },
          },
        },
      ],
      animation: false,
    }
    // option.graphic.elements[0].style.text = month;
    myChart.value.setOption(option)
  }
}
</script>

<style lang="scss" scoped>
.chart-dialog-content {
  .chart-content {
    height: 550px;
    width: 100%;
    margin: 0 auto;
  }

  .opt-bar {
    padding: 12px 16px;
    display: flex;
    align-items: center;

    > div {
      margin-right: 16px;
    }

    i {
      margin-right: 4px;
    }

    .desc {
      font-weight: bold;
      margin-right: 8px;
    }

    .el-date-editor {
      width: 170px;
    }
  }

  .bottom {
    padding: 16px;
    background: #f2f4f7;

    .time-line {
      display: flex;
      width: 80%;
      height: 36px;
      margin: 0 auto;

      .line-item {
        display: flex;
        align-items: center;
        width: 100%;
        cursor: pointer;

        &:first-child {
          width: 10px;

          .line {
            width: 0;
          }
        }

        &.hover {
          .text {
            color: #467ff1;
          }
        }

        &.active {
          .point {
            border: 2px solid #477ff0;

            .text {
              font-weight: 500;
            }
          }

          .line {
            background: #477ff0;
          }
        }

        .point {
          position: relative;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #fff;

          .text {
            position: absolute;
            white-space: nowrap;
            transform: translate(-50%, -135%);
          }

          .icon {
            font-size: 32px;
            position: absolute;
            color: #fff;
            transform: translate(-50%, 0);
          }
        }

        .line {
          width: 100%;
          height: 3px;
          background: #efefef;
        }
      }
    }

    .chart-content {
      background: #fff;
    }

    .type-radio {
      padding: 12px;
      background: #fff;

      .el-radio {
        font-weight: 400;
        color: rgba(0, 0, 0, 0.65);
        margin-right: 12px;
      }
    }
  }
}
</style>
