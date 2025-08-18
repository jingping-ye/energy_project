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
</script>
