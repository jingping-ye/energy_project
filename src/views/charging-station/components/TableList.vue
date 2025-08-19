<template>
  <el-card class="mt">
    <el-row>
      <el-col
        :span="6"
        v-for="(button, index) in buttonOperationList"
        :key="index"
      >
        <component :is="button.name" v-bind="button.props" v-on="button.on">
          <template v-if="button.slots?.default">
            <component :is="button.slots.default"></component>
          </template>
        </component>
      </el-col>
    </el-row>
  </el-card>
</template>
<script lang="ts" setup>
import { Plus } from "@element-plus/icons-vue";
import type {QueryFormParams} from './type';
import {getStationListData} from '@/api/chargingStation.api';
import { onMounted, watch } from "vue";
const buttonOperationList = [
  {
    name: "el-button",
    props: {
      type: "primary",
      icon: Plus,
    },
    on: {
      click: add,
    },
    slots: {
      default: () => "新增充电站",
    },
  },
];

function add() {
  console.log("add");
}

interface Props{
  queryForm:QueryFormParams,
}
const props = defineProps<Props>();

// 监控props数据
watch(()=>props.queryForm, ()=>{
  getStationListDataRequest();
}, {deep:true})


/***
 * HTTP REQUEST
 * 获取监控电站列表
 */
async function getStationListDataRequest(){
  const requestBody = {
    ...props.queryForm,
    currentPage:1,
    pageSize:10,
  };
  let res = await getStationListData(requestBody);
}

onMounted(()=>{
  getStationListDataRequest();
})
</script>
