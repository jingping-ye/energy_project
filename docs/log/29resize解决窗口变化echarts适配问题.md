# 29resize解决窗口变化echarts适配问题

## 使用echarts的resize事件
```ts
// 基于准备好的dom，初始化echarts实例
const chartRef = ref(null);
const chartRef2 = ref(null);
function initEchart() {
  var myChart = echarts.init(chartRef.value);

  // 绘制图表
  myChart.setOption({
    title: {
      text: "ECharts 入门示例",
    },
    tooltip: {},
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  });

  const resizeChart = () => {
    myChart.resize();
  };
  window.addEventListener('resize', resizeChart);
}

onMounted(() => {
  initEchart();
});
```

## deep选择器写法的更改
原来的写法
```css
::v-deep .my-class{}
```
新的写法
```css
:deep (.my-class)
```