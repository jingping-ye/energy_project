# 22 快捷页签导航结合 pinia 基础逻辑实现

> 实现 tab 布局的基本逻辑

## 新建 tab.store.ts 文件，存储 tab

```ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

const useTabStore = defineStore('tabs', () => {
  const tabs = ref<App.IMenuItem[]>([]);

  const addTab = function (menuItem: App.IMenuItem) {
    if (!tabs.value.some((menu) => menuItem === menu)) {
      tabs.value.push(menuItem);
    }
  };

  const removeTab = function (name: string) {
    tabs.value = tabs.value.filter((item) => item.name !== name);
  };

  return {
    tabs,
    addTab,
    removeTab,
  };
});

export default useTabStore;
```

## 修改 NavTab.vue 文件

> 引入全局状态 tabStore

```vue
<template>
  <el-tabs v-model="activeTab" type="card" class="demo-tabs" closable>
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
import { ref } from 'vue';
import type { TabPaneName } from 'element-plus';
import useTabStore from '@/store/tab.store';
import { storeToRefs } from 'pinia';
const tabStore = useTabStore();
const { tabs } = storeToRefs(tabStore);

const activeTab = ref('');
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
```

## 修改 MenuItem.vue 文件

> 修改 MenuItem.vue 文件，点击菜单时新增菜单。

```vue
<template>
  <el-sub-menu :index="item.url" v-if="isShowSubMenu">
  <!-- ... -->
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
function clickMenuItem() {
  tabStore.addMenuTab(props.item);
}
</script>
<style lang="less" scoped></style>
```

## 修改`LayoutDefault.vue`文件，在这个文件中使用命名视图，显示跳转时的路由对应的视图。

```vue
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
```
