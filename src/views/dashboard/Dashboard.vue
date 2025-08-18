<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <!-- <el-card>
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
          <el-col :span="8">
            <div ref="chartRef2" style="width: 100%; height: 400px"></div>
          </el-col>
          <el-col :span="16">
            <div ref="chartRef" style="width: 100%; height: 400px"></div>
          </el-col>
        </el-row>
      </el-card> -->
    </el-col>
    <el-col :span="6">
      <!-- <el-card>
        <template #header> 设备总览 </template>
        <div style="width: 100%; height: 240px" ref="chartRef3"></div>
      </el-card> -->
      <el-card>
        <template #header>营收统计表</template>
        <ul>
          <li class="revenue-item" v-for="item in  revenueList" :key="item.rank">
            <span class="item-rank">{{ item.rank }}</span>
            <span class="item-title">{{ item.city }}</span>
            <span class="item-num">{{ item.num }}</span>
            <span class="item-percent">{{item.ratio}}</span>
            <span class="item-icon">
              <el-icon color="#67C23A" v-if="item.trend>0"><CaretTop /></el-icon>
              <el-icon color="#F56C6C" v-else-if="item.trend<0"><CaretBottom /></el-icon>
              <el-icon v-else>
                -
              </el-icon>
            </span>
          </li>
        </ul>
      </el-card>
      <el-card class="mt">
        <template #header> 故障报警 </template>
        <el-timeline style="max-width: 600px">
          <el-timeline-item
            v-for="(item,index) in warningList"
            :key="index"
            :timestamp="item.time"
            placement="top"
            :hollow="true"
            :type="item.status === 'abnormal'?'warning':'danger'"
          >
            <el-card>
              <h4>{{ item.title }}</h4>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </el-col>
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
import { ref, reactive } from "vue";

// hooks
import { useChart } from "@/hooks/useChart";
import { Bottom, CaretBottom } from "@element-plus/icons-vue";
import {
  getLineChartData,
  getPieChartData,
  getRadarChartData,
} from "@/api/dashboard.api";

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

const chartRef3 = ref(null);
async function setRadarChartData() {
  let option = reactive({
    radar: {
      indicator: [
        { name: "闲置数", max: 65 },
        { name: "使用数", max: 160 },
        { name: "故障数", max: 300 },
        { name: "维修数", max: 380 },
        { name: "更换数", max: 520 },
        { name: "报废数", max: 250 },
      ],
    },
    series: [
      {
        name: "设备总览",
        type: "radar",
        data: [
          {
            value: [],
            name: "设备总览",
          },
        ],
      },
    ],
  });

  let result = await getRadarChartData();
  option.series[0].data[0]["value"] = result.list;
  return option;
}
useChart(chartRef3, setRadarChartData);

const chartRef2 = ref(null);
async function setPieChartData() {
  let option = reactive({
    legend: {
      top: "bottom",
    },
    // 其实不写也行
    tooltip: {
      trigger: "item",
      formatter: "{a}<br/>{b}:{c}",
    },
    series: [
      {
        name: "营收占比",
        type: "pie",
        radius: ["30%", "50%"],
        center: ["50%", "50%"],
        roseType: "area",
        data: [],
        emphasis: {
          label: {
            show: true,
            fontSize: "18",
            fontWeight: "bold",
          },
        },
      },
    ],
    graphic: {
      type: "text",
      left: "center",
      top: "center",
      style: {
        text: "营收占比",
        fontSize: 16,
        fill: "#333",
      },
    },
  });

  let result = await getPieChartData();
  option.series[0].data = result.list;
  return option;
}
useChart(chartRef2, setPieChartData);

const chartRef = ref(null);
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

  let result = await getLineChartData();
  const list = result.list;
  option.legend.data = list.map((item) => item.name);
  option.series = option.series.map((item, index) => {
    item.data = list[index]["data"];
    return item;
  });
  return option;
}
useChart(chartRef, setLineChartData);

const revenueList = reactive([
  {
    rank: 1,
    city: "广州",
    num: "52,457",
    ratio: "24%",
    trend: 0.1,
  },
  {
    rank: 2,
    city: "上海",
    num: "323,234",
    ratio: "24%",
    trend: -0.1,
  },
  {
    rank: 3,
    city: "佛山",
    num: "192,255",
    ratio: "24%",
    trend: 0,
  },
  {
    rank: 4,
    city: "珠海",
    num: "17,540",
    ratio: "24%",
    trend: 0.1,
  },
  {
    rank: 5,
    city: "深圳",
    num: "662,337",
    ratio: "24%",
    trend: -0.1,
  },
  {
    rank: 6,
    city: "厦门",
    num: "22,941",
    ratio: "24%",
    trend: 0.1,
  },
  {
    rank: 7,
    city: "长沙",
    num: "565,221",
    ratio: "24%",
    trend: 0.1,
  },
]);

const warningList = reactive([
  {
    time:"2025/06/01",
    title:"充电桩1号故障",
    status:"abnormal", // 异常
  },
  {
    time:"2025/06/05",
    title:"充电站2号停止运行",
    status:"fatal", // 故障
  },
  {
    time:"2025/06/08",
    title:"充电桩3号故障",
    status:"abnormal", // 异常
  },
])

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
.revenue-item {
  display: flex;
  padding: 10px 10px;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}
.revenue-item:nth-child(even) {
  background-color: #fcf6ec;
}
.item-rank {
  display: inline-block;
  width: 24px;
  height: 24px;
  font-weight: bold;
  border-radius: 50%;
  text-align: center;
}
li:nth-of-type(1) .item-rank {
  background-color: #5fb634;
  color: #fff;
}
li:nth-of-type(2) .item-rank {
  background-color: #3593f2;
  color: #fff;
}
li:nth-of-type(3) .item-rank {
  background-color: #d4983d;
  color: #fff;
}
.item-num {
  margin-right: 20px;
}
.item-percent {
  margin-right: 10px;
}
.item-title {
  margin-left: 10px;
  flex-grow: 1;
}
</style>
