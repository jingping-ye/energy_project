<template>
  <FormQuery @refresh="getQueryFormParams"></FormQuery>
  <StationStatistics></StationStatistics>
  <TableList :queryForm="queryForm"></TableList>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import FormQuery from "./components/FormQuery.vue";
import StationStatistics from "./components/StationStatistics.vue";
import TableList from './components/TableList.vue'
import type {QueryFormParams} from './type';

let queryForm = reactive<QueryFormParams>({
  id:"",
  name:"",
  status:"",
})
function getQueryFormParams(QueryFormParams){
  queryForm = Object.assign(queryForm, queryFormParams);
}
</script>
