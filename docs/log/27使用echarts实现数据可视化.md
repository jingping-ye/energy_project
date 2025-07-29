# 27 使用echarts实现数据可视化

## 什么是数据可视化
- 通过图表的形式展示数据

## echarts
```bash
# 安装
npm install echarts -S
```

## 使用
```js
import * as echarts from 'echarts';

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
myChart.setOption({
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
});
```

## 要点

### vue中不提倡操作dom，如果要操作dom，使用ref

### echarts初始化必须在mounted之后，也就是真实DOM挂载之后。setup相当于beforeCreate，只是创建了空白实例，尚未进行数据绑定。 

- vue生命周期

### ref 对象要放在函数外初始化，因为依赖于实例上下文


## 代码
```vue
<template>
  <el-row>
    <el-col :span="18">
      <el-card>
        <div class="title">
          <h3>今日设备运行状态</h3>
          <p class="update-time">更新时间：2025年06月27日</p>
          <el-icon color="#86909c" style="margin-left: 5px">
            <Refresh></Refresh>
          </el-icon>
        </div>
        <div class="equipment">
          <div class="equipment-item">
            <h4 class="mt">充电桩使用率</h4>
            <img :src="flash" class="mt" />
            <h1 class="mt">72/95</h1>
            <div class="statistic-card">
              <el-statistic :value="9">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    异常设备
                    <el-tooltip
                      effect="dark"
                      content="当前有9台设备异常，请尽快处理"
                      placement="top"
                    >
                      <el-icon style="margin-left: 4px" :size="12">
                        <Warning />
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
              </el-statistic>
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>相较昨日</span>
                  <span class="green">
                    24%
                    <el-icon>
                      <CaretTop color="green" />
                    </el-icon>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="equipment-item">
            <h4 class="mt">充电柜使用率</h4>
            <img :src="flash2" class="mt" />
            <h1 class="mt">655/1233</h1>
            <div class="statistic-card">
              <el-statistic :value="22">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    异常设备
                    <el-tooltip
                      effect="dark"
                      content="当前有22台设备异常，请尽快处理"
                      placement="top"
                    >
                      <el-icon style="margin-left: 4px" :size="12">
                        <Warning />
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
              </el-statistic>
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>相较昨日</span>
                  <span class="green">
                    24%
                    <el-icon>
                      <CaretTop color="red" />
                    </el-icon>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="equipment-item">
            <h4 class="mt">充电站使用率</h4>
            <img :src="flash3" class="mt" />
            <h1 class="mt">72/90</h1>
            <div class="statistic-card">
              <el-statistic :value="9">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    异常设备
                    <el-tooltip
                      effect="dark"
                      content="当前有9台设备异常，请尽快处理"
                      placement="top"
                    >
                      <el-icon style="margin-left: 4px" :size="12">
                        <Warning />
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
              </el-statistic>
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>相较昨日</span>
                  <span class="green">
                    14%
                    <el-icon>
                      <CaretTop color="green" />
                    </el-icon>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="mt">
        <template #header>
          <h1>常用功能</h1>
        </template>
        <div class="quick mt mb">
          <el-row justify="center">
            <el-col :span="4" v-for="item in commonFunc" :key="item.title">
              <img :src="item.img" />
              <p>{{ item.title }}</p>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="mt">
        <template #header>
          <h1>能源统计</h1>
        </template>
        <el-row>
          <el-col :span="6">
            <div ref="chartRef" style="width: 100%; height: 400px"></div>
          </el-col>
          <el-col :span="18">
            <div ref="chartRef2" style="width: 100%; height: 400px"></div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="6"></el-col>
  </el-row>
</template>
<script setup lang="ts">
// 今日设备运行状态
import flash from "@/assets/flash.png";
import flash2 from "@/assets/flash2.png";
import flash3 from "@/assets/flash3.png";

// 常用功能
import repair from "@/assets/repair.png";
import progress from "@/assets/progress.png";
import remain from "@/assets/remain.png";
import total from "@/assets/total.png";
import money from "@/assets/money.png";
import daily from "@/assets/daily.png";

// utils
import { ref,onMounted } from "vue";
import * as echarts from "echarts";

const commonFunc = [
  {
    img: repair,
    title: "充电站管理",
    url: "",
  },
  {
    img: progress,
    title: "电子地图",
    url: "",
  },
  {
    img: remain,
    title: "运营管理",
    url: "",
  },
  {
    img: total,
    title: "报警管理",
    url: "",
  },
  {
    img: money,
    title: "会员卡管理",
    url: "",
  },
  {
    img: daily,
    title: "招商管理",
    url: "",
  },
];
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
}

onMounted(()=>{
  initEchart();
})
</script>
<style lang="less" scoped>
.title {
  display: flex;
  flex-direction: row;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  align-items: flex-end;

  .update-time {
    color: #86909c;
    margin-left: 5px;
  }
}
.equipment {
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
  &-item {
    h1 {
      font-size: 36px;
    }
  }
}
.quick {
  text-align: center;
}
</style>
```