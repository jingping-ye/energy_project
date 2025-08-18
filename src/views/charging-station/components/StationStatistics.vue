<template>
  <el-card class="mt">
    <el-row>
      <el-col :span="6" v-for="(item, index) in statisticsList" :key="index">
        <el-statistic :title="item.name" :value="item.value" />
      </el-col>
    </el-row>
  </el-card>
</template>
<script setup lang="ts">
import { ref } from "vue";
interface Statistics {
  name: string;
  value: number;
}

const statisticsList = ref<Statistics[]>([
  {
    name: "累计充电量（度）",
    value: 268900,
  },
  {
    name: "累计充电次数（次）",
    value: 268900,
  },
  {
    name: "服务区域（个）",
    value: 88,
  },
  {
    name: "累计效益（元）",
    value: 5622178,
  },
]);
</script>
