<template>
  <el-sub-menu :index="item.url" v-if="isShowSubMenu">
    <template #title>
      <el-icon>
        <component :is="item.icon"></component>
      </el-icon>
      <span>{{ item.name }}</span>
    </template>
    <menu-item v-for="subItem in item.children" :key="subItem.url" :item="subItem"></menu-item>
  </el-sub-menu>
  <el-menu-item :index="item.url" v-else @click="clickMenuItem">
    <el-icon>
      <component :is="item.icon"></component>
    </el-icon>
    <span>{{ item.name }}</span>
  </el-menu-item>
</template>
<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
  name: 'MenuItem',
});

interface Props {
  item: App.IMenuItem;
}

const props = defineProps<Props>();

// 是否显示子菜单
const isShowSubMenu = computed(() => {
  return props.item.children?.length ?? 0 > 0;
});

import useTabStore from '@/store/tab.store';
const tabStore = useTabStore();
const { addTab, setActiveTab } = tabStore;
function clickMenuItem() {
  addTab(props.item);
  setActiveTab(props.item.name, props.item.url);
}
</script>
<style lang="less" scoped></style>
