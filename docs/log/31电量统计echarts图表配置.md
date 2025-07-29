# 31 电量统计echarts图表配置

## 如何开发图表组件
- 不用查文档，直接去示例中找个类似的图表。
- 有不明的地方，去查配置项手册。

## echarts配置项
- legend的data属性要和series中的name一致。
- xAxis
    - boundaryGap: 图表在中间还是在边界点。
- yAxis
    - axisLabel: 坐标轴标签
        - formatter: 格式化
            - `{value} %`:value 原来的数据
- lineStyle: 线样式
- itemStyle: 线的颜色、投影等等

## 实现折线图，代码
```ts
const chartRef = ref(null);
const option1 = {
  title: {
    text: '电量统计',
    textStyle:{
      fontSize:14,
    }
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['充电量', '充电时长', '充电功率']
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00','20:00','21:00']
  },
  yAxis: {
    type: 'value',
    axisLabel:{
      formatter:'{value} kw'
    }
  },
  series: [
    {
      name: '充电量',
      type: 'line',
      smooth:true,
      data: [20,50,30,70,60,80,40,60,50],
      lineStyle:{
        width:3,
      },
      itemStyle:{
        color:"purple",
        shadowBlur:3,
        shadowColor:'rgba(0,255,0,0.5)'
      }
    },
    {
      name: '充电时长',
      type: 'line',
      smooth:true,
      data: [40,60,50,80,70,90,60,70,80],
      lineStyle:{
        width:3,
      },
      itemStyle:{
        color:"lightgreen",
        shadowBlur:3,
        shadowColor:'rgba(0,255,0,0.5)'
      }
    },
    {
      name: '充电功率',
      type: 'line',
      smooth:true,
      data: [30,40,60,50,70,20,30,40,60],
      lineStyle:{
        width:3,
      },
      itemStyle:{
        color:"skyblue",
        shadowBlur:3,
        shadowColor:'rgba(0,255,0,0.5)'
      }
    },
  ]
};
useChart(chartRef, option1);
```