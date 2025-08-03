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
            <div ref="chartRef2" style="width: 100%; height: 400px"></div>
          </el-col>
          <el-col :span="18">
            <div ref="chartRef" style="width: 100%; height: 400px"></div>
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
import { ref, onMounted, onBeforeUnmount, reactive } from "vue";
import * as echarts from "echarts";

// hooks
import { useChart } from "@/hooks/useChart";
import { Bottom } from "@element-plus/icons-vue";
import { getChartData } from "@/api/dashboard.api";

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
// const option1 = ;
// useChart(chartRef, option1);

const option2 = {
  legend: {
    bottom: 0,
  },
  series: [
    {
      type: "pie",
      radius: ["50%", "70%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: false,
          fontSize: 40,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "充电桩", itemStyle: { color: "#4366b5" } },
        { value: 735, name: "充电站", itemStyle: { color: "#38b48d" } },
        { value: 580, name: "充电杆", itemStyle: { color: "#4ebcd2" } },
      ],
    },
  ],
};

const chartRef2 = ref(null);

async function setLineChartData() {
  let option = reactive({
    title: {
      text: "电量统计",
      textStyle: {
        fontSize: 14,
      },
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: [],
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
      ],
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value} kw",
      },
    },
    series: [
      {
        name: "充电量",
        type: "line",
        smooth: true,
        data: [],
        lineStyle: {
          width: 3,
        },
        itemStyle: {
          color: "purple",
          shadowBlur: 3,
          shadowColor: "rgba(0,255,0,0.5)",
        },
      },
      {
        name: "充电时长",
        type: "line",
        smooth: true,
        data: [],
        lineStyle: {
          width: 3,
        },
        itemStyle: {
          color: "lightgreen",
          shadowBlur: 3,
          shadowColor: "rgba(0,255,0,0.5)",
        },
      },
      {
        name: "充电功率",
        type: "line",
        smooth: true,
        data: [],
        lineStyle: {
          width: 3,
        },
        itemStyle: {
          color: "skyblue",
          shadowBlur: 3,
          shadowColor: "rgba(0,255,0,0.5)",
        },
      },
    ],
  });
  interface chartData {
    name:string;
    data:number[];
  }
  let result = await getChartData();
  const list = result.list;
  option.legend.data = list.map((item) => item.name);
  option.series = option.series.map(
    (item, index) => {
      item.data = list[index]["data"];
      return item;
    }
  );
  return option;
}
useChart(chartRef, setLineChartData);
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
