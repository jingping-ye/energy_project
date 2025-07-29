# 30 封装useChart自定义组合式函数

## hooks
hooks和react中的hooks一个概念

## 源代码
```vue
<template>
    <div ref="chartRef" style="width: 100%; height: 400px"></div>
</template>
<script setup lang='ts'>
// 原始JS
const chartRef = ref(null);
function createChart() {
  const myChart = echarts.init(chartRef.value);
  const option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  };
  myChart.setOption(option);
}

// 调整图表
function resizeChart() {
  const myChart = echarts.init(chartRef.value);
  myChart.resize();
}

// 挂载时
onMounted(() => {
  createChart();
  window.addEventListener('resize', resizeChart);
});

// 卸载时
onBeforeUnmount(()=>{
  window.removeEventListener("resize",resizeChart);
})
</script>
```

## 封装useChart
```ts
// @/hooks/useChart.ts
import type {Ref} from 'vue'; // 写不写type都可以
import {onBeforeUnmount, onMounted, ref,markRaw} from 'vue';
import * as echarts from 'echarts';

export function useChart(chartRef:Ref<HTMLElement|null>,initialOptions:any){
    const chartInstance = ref<echarts.ECharts|null>(null);
    const chartOptions = ref(initialOptions);

    const initChart = () => {
        if(chartRef.value){
            // 初始化实例
            chartInstance.value = markRaw(echarts.init(chartRef.value));
            chartInstance.value.setOption(chartOptions.value);
        }
    }

    const resizeChart =  () => {
        chartInstance.value?.resize();
    }

    onMounted(()=>{
        initChart();
        window.addEventListener("resize", resizeChart);
    })

    onBeforeUnmount(()=>{
        window.removeEventListener("resize", resizeChart);
        // 释放图表能占用的资源：图表实例
        if(chartInstance.value){
            // 如果图表实例还在，释放图表所占用的资源
            chartInstance.value.dispose(); 
        }
    })

}
```


### 调整窗口的时候自动报错

#### 问题
echarts内部存在响应式，当调整窗口大小时，两种响应式存在冲突。
报错
```txt
Uncaught TypeError: Cannot read properties of undefined (reading 'type')
```

解决方法：取消掉vue的内部响应式
使用`markRaw`取消vue的响应式监测。

