# 34优化useChart 渲染饼形图配置

## echarts 实现饼图
```ts
option = {
  legend: {
    top: 'bottom'
  },
  // 其实不写也行
  tooltip:{
     trigger:"item",
     formatter:"{a}<br/>{b}:{c}"
  },
  series: [
    {
      name: '营收占比',
      type: 'pie',
      radius: ['50%', '70%'],
      center: ['50%', '50%'],
      roseType: 'area',
      data: [
        { value: 35, name: '充电桩' },
        { value: 30, name: '充电站' },
        { value: 25, name: '充电杆' },
      ],
      emphasis:{
        label:{
          show:true,
          fontSize:"16",
          fontWeight:"bold"
        } 
      }
    }
  ],
  graphic:{
    type:'text',
    left:'center',
    top:'center',
    style:{
      text:'营收占比',
      fontSize:30,
      fill:'#333'
    }
  },
};
```


## echarts 饼图配置项
- legend 图例：显示数据对应的数据集名称
- tooltip: 提示，鼠标滑过时显示
    - trigger:出发条件
        - item: 用于无坐标轴的图
        - axis: 用于由坐标轴的图
    - formatter: 显示tooltip
        - `{a}`: 系列名称
        - `{b}`: 数据项名称
        - `{c}`: 数值
        - `<br/>` 支持换行
- series: 数据
    - radius: 第一个数值，内圆的半径；第二个数值，外圆的半径
        - 可以用数值，可以用百分比
    - center: 圆心的位置
    - emphasis: 当选择了数据项时，标签的样式
        - label
    - graphic：自定义图形、文本




### 选择了数据项，高亮文本
```ts
emphasis:{
    label:{
        show:true,
        fontSize:"16",
        fontWeight:"bold"
    } 
}
```

### 绘制饼图中心文本
使用自定义图形
```ts
graphic:{
    type:'text',
    left:'center', // 注意这里，文档上写的是middle，但是实际中用的是center
    top:'center', // 注意这里，文档上写的是middle，但是实际中用的是center
    style:{
        text:'营收占比',
        fontSize:30,
        fill:'#333'
    }
},
```
graghic的用法，参考 [Echarts 绘制自定义图案（graphic）](https://juejin.cn/post/7426558698724868134)