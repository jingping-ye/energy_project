<template>
  <div class="header">
    <div class="header__personel">
      <el-badge :is-dot="info > 0">
        <el-icon><Bell /></el-icon>
      </el-badge>
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" class="ml mr avatar" />
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          欢迎您，{{ username }}!
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="item in optList" :key="item.command" :icon="item.icon" :command="item.command">
              {{ item.title }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const info = ref(5);

import { useUserStore } from '@/store/auth.store';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();
const { username } = storeToRefs(userStore); // 防止解构后失去响应式

const optList = [
  {
    command: 'user',
    title: '个人中心',
    icon: 'User',
  },
  {
    command: 'logout',
    title: '退出登录',
    icon: 'SwitchButton',
  },
];

import { useRouter } from 'vue-router';
const router = useRouter();
function handleCommand(command: string) {
  if (command === 'user') {
    router.push('/personal');
  } else if (command === 'logout') {
    userStore.logout();
    router.push('/login');
  }
}
</script>

<style lang="less" scoped>
.header {
  background-color: #fff;
  height: 60px;
  padding: 0 20px;
  box-sizing: border-box;
  .header__personel {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
  }
}
.avatar {
  width: 30px;
  height: 30px;
  margin-top: -10px;
}
</style>
