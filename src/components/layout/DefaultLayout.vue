<template>
  <el-container>
    <el-aside width="200px">
      <side-menu></side-menu>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import { default as SideMenu } from './Menu/Index.vue';
</script>
<style lang="less" scoped>
.el-container {
  height: 100vh;
}
.el-aside {
  background: #fff;
  height: 100vh;
  box-shadow: 10px 0px 8px -2px rgba(0, 0, 0, 0.2);
}
.el-header {
  padding: 0 !important;
}
.el-main {
  overflow: auto;
}
</style>
