# 4 配置 src 目录和解决 ts 报错问题

## 设置别名@

作用：

- 不用相对路径，每次都从 src 目录下开始找。
  在 vite.config.ts 中配置

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

- \_\_dirname：当前文件所在的文件夹路径
- path.resolve: 拼接路径

## 解决 ts 报错问题

### `__dirname`常量报错

原因：

- `__dirname`常量会报错，因为`__dirname`是 node.js 常量。

解决方案：

- 安装`@types/node`来声明`__dirname`的类型

### 在路由文件中使用`@`报错

原因：
`@`符号编辑器不认

解决方法
在 tsconfig.app.json 中添加如下代码

```ts
{
  "compilerOptions":{
    "paths":{
      "@/*":['./src/*']
    }
  }
}
```

- `@/`: 以`@/`开头的路由
- 修改完重启 IDE.

## 修改 router/index.ts 文件

```ts
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    component: () => import('@/views/Home.vue'),
  },
  {
    name: 'About',
    path: '/about',
    component: () => import('@/views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```
