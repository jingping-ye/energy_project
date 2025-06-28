<template>
  <el-container>
    <el-aside>
      <side-menu></side-menu>
    </el-aside>
    <el-container class="main__container">
      <TopHeader></TopHeader>
      <el-main>
        <NavTab></NavTab>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import { default as SideMenu } from './Menu/Index.vue';
import TopHeader from './HeaderTop/HeaderTop.vue';
import NavTab from './NavTab/NavTab.vue';
</script>
<style lang="less" scoped>
.el-container {
  height: 100vh;
}
.el-aside {
  width: 200px;
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
.main__container {
  display: flex;
  flex-direction: column;
}
</style>
