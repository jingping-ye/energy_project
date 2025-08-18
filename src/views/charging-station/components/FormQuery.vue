<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input
          v-model="queryForm.searchStr"
          style="max-width: 600px"
          placeholder="站点名称或者站点编码"
          class="input-with-select"
        >
          <template #append>
            <el-select v-model="queryForm.searchType" style="width: 115px">
              <el-option label="按名称查询" value="name" />
              <el-option label="按编码查询" value="code" />
            </el-select>
          </template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-select v-model="queryForm.status" placeholder="充电站状态">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>
<script setup lang="ts">
import { reactive } from "vue";


const statusList = [
  {
    name: "全部",
    value: "",
  },
  {
    name: "使用中",
    value: "1",
  },
  {
    name: "空闲中",
    value: "2",
  },
  {
    name: "维护中",
    value: "3",
  },
  {
    name: "待维修中",
    value: "4",
  },
];

const queryForm = reactive({
  searchStr: "",
  searchType: "name",
  status: "",
});

// 查询
function search() {
  console.log("search......");
}

// 重置
function reset() {
  queryForm.searchStr = "";
  queryForm.searchType = "name";
  queryForm.status = "";
}
</script>
