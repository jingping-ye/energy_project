import { defineStore } from 'pinia';
import { ref } from 'vue';

const useTabStore = defineStore('tabs', () => {
  const tabs = ref<App.IMenuItem[]>([]); // 所有菜单项
  const activeTab = ref<Pick<App.IMenuItem, 'name' | 'url'>>({ name: '', url: '' }); // 当前激活的菜单

  // 新增菜单
  const addTab = function (menuItem: App.IMenuItem) {
    if (!tabs.value.some((menu) => menuItem === menu)) {
      tabs.value.push(menuItem);
    }
  };

  // 设置激活的菜单
  const setActiveTab = function (name: string, url: string) {
    activeTab.value = { name, url };
  };

  const removeTab = function (name: string) {
    const currentTabIndex = tabs.value.findIndex((item) => item.name === name);
    if (currentTabIndex !== 0) {
      if (name === activeTab.value.name) {
        activeTab.value = tabs.value[currentTabIndex - 1];
      }
      tabs.value = tabs.value.filter((item) => item.name !== name);
    }
  };

  return {
    tabs,
    addTab,
    removeTab,
    activeTab,
    setActiveTab,
  };
});

export default useTabStore;
