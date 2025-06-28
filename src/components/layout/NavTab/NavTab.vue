<template>
  <el-tabs
    v-model="activeTab.name"
    type="card"
    class="demo-tabs"
    closable
    @tab-remove="handleRemoveTab"
    @tab-click="handleTabClick"
  >
    <el-tab-pane v-for="item in tabs" :key="item.name" :label="item.name" :name="item.name">
      <template #label>
        <div class="tab__label">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <div class="tab__name">{{ item.name }}</div>
        </div>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import type { TabPaneName } from 'element-plus';
import useTabStore from '@/store/tab.store';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
const router = useRouter();

const tabStore = useTabStore();
const { tabs, activeTab } = storeToRefs(tabStore);
const { setActiveTab, addTab, removeTab } = tabStore;

const handleRemoveTab = (targetName: TabPaneName) => {
  removeTab(targetName as string);
  router.push(activeTab.value.url);
};

// 处理tab点击事件
function handleTabClick({ index }: { index: number }) {
  const name = tabs.value[index]['name'];
  const url = tabs.value[index]['url'];
  setActiveTab(name, url);
  router.push(url);
}

const route = useRoute();

import { useUserStore } from '@/store/auth.store';
const userStore = useUserStore();
const { menu } = userStore;

// 递归查找菜单
function findMenuItemByUrl(menus: App.IMenuItem[], url: string): undefined | App.IMenuItem {
  for (let menu of menus) {
    if (menu.url === url) {
      return menu;
    }
    if (menu.children) {
      const found: undefined | App.IMenuItem = findMenuItemByUrl(menu.children, url);
      if (found) {
        return found;
      }
    }
  }
  return undefined;
}

// 初始化激活菜单
function initActiveMenu() {
  const activeMenu = findMenuItemByUrl(menu, route.path) as App.IMenuItem;
  addTab(activeMenu);
  setActiveTab(activeMenu.name, activeMenu.url);
}
initActiveMenu();
</script>

<style lang="less" scoped>
:deep(.is-active) {
  background-color: #2087fb;
  color: #fff;
}
.tab__label {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.tab__name {
  margin-left: 5px;
}
</style>
