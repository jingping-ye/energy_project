<template>
  <div class="menu">
    <div class="title">
      <img class="title__logo" :src="Logo" />
      <div class="title__text">动力港</div>
    </div>
    <el-menu :router="true" :default-active="$route.path">
      <menu-item v-for="item in menu" :key="item.url" :item="item"></menu-item>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
// assets
import Logo from '@/assets/logo.png';
// component
import MenuItem from './MenuItem.vue';

// store
import { useUserStore } from '@/store/auth.store';
const userStore = useUserStore();
const menu = userStore.menu;
</script>
<style lang="less" scoped>
.title {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px 0px;
  height: 50px;
  align-items: center;
  &__logo {
    margin-left: -10px; // 让整体位置稍微左移
    width: 34px;
    height: 34px;
  }
  &__text {
    color: #333;
    margin-left: 10px;
    font-size: 22px;
    font-weight: 800;
  }
}
.el-menu {
  border-right: none;
}
.menu {
  overflow: hidden;
  height: 100vh;
}
.menu:hover {
  overflow: auto;
}

// 为什么要设置在Menu.vue文件，设置在MenuItem.vue文件中会无效呢？
// 是因为递归组件的影响吗？
// 菜单项激活时的颜色
:deep(.el-menu-item.is-active) {
  background-color: #2087fb;
  color: #fff;
}
// 菜单项的hover背景颜色
:deep(.el-menu-item:hover) {
  background-color: #2087fb;
  color: #fff;
}
// 组合菜单时，主菜单hover时的背景颜色
:deep(.el-sub-menu__title:hover) {
  background-color: #2087fb;
  color: #fff;
}
</style>
