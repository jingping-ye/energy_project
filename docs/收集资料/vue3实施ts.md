# vue3 实施 TS

在 Vue 3 项目中实施 TypeScript 最佳实践和类型系统设计，需要结合 Vue 特有的 Composition API、响应式系统和组件生态。以下是具体实施内容和方案：

---

### 一、**核心实施领域**

#### 1. **组件 Props 类型化**（关键实践）

```typescript
<script setup lang="ts">
// ✅ 推荐：使用泛型接口定义复杂 Props
interface Props {
  title: string
  items: Array<{ id: number; name: string }>
  status?: 'pending' | 'active' | 'disabled'
  onChange?: (newVal: number) => void
}

const props = defineProps<Props>()

// 🚫 避免：运行时声明（丢失类型检查）
defineProps({
  title: String, // 无法约束具体内容
  items: Array   // 丢失元素类型信息
})
</script>
```

**优化方案：**

- 使用 `withDefaults` 处理默认值
- 复杂对象使用 `PropType` 强制类型：

  ```typescript
  import type { PropType } from 'vue';

  defineProps({
    items: {
      type: Array as PropType<Item[]>,
      required: true,
    },
  });
  ```

---

#### 2. **Emit 事件类型化**

```typescript
<script setup lang="ts">
// ✅ 事件签名类型化
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'submit', payload: FormData): void
  (e: 'error', code: number, message: string): void
}>()

// 🚫 避免：字符串数组形式（丢失参数类型）
defineEmits(['update:modelValue'])
```

---

#### 3. **Ref/Reactive 类型声明**

```typescript
import type { Ref } from 'vue';

// ✅ 显式声明 ref 类型
const count: Ref<number> = ref(0);

// ✅ Reactive 接口声明
interface UserState {
  name: string;
  permissions: string[];
}

const user = reactive<UserState>({
  name: '',
  permissions: [],
});
```

---

#### 4. **Composable 函数类型设计**

```typescript
// useCounter.ts
export function useCounter(initial: number): {
  count: Ref<number>;
  increment: (step?: number) => void;
  reset: () => void;
} {
  const count = ref(initial);

  const increment = (step = 1) => {
    count.value += step;
  };
  const reset = () => {
    count.value = initial;
  };

  return { count, increment, reset };
}
```

---

### 二、**架构级实施**

#### 1. **API 响应类型契约**

```typescript
// api/types.ts
export interface ApiResponse<T> {
  code: number;
  data: T;
  message?: string;
}

export type UserProfile = {
  id: number;
  name: string;
  avatar: string;
};

// api/user.ts
import axios from 'axios';
import type { ApiResponse, UserProfile } from './types';

export const fetchUser = async (id: number) => {
  const { data } = await axios.get<ApiResponse<UserProfile>>(`/api/user/${id}`);
  return data.data; // 类型安全访问
};
```

---

#### 2. **全局状态管理（Pinia）类型化**

```typescript
// stores/userStore.ts
import { defineStore } from 'pinia';

interface State {
  users: Map<number, User>;
  loading: boolean;
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    users: new Map(),
    loading: false,
  }),
  actions: {
    async fetchUser(id: number) {
      this.loading = true;
      const user = await fetchUser(id); // 类型化API调用
      this.users.set(user.id, user);
    },
  },
  getters: {
    getUserById: (state) => (id: number) => state.users.get(id),
  },
});
```

---

#### 3. **组件库类型增强**

```typescript
// components/BaseButton.vue
<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'danger'
  icon?: string
}>()
</script>

// 全局组件类型声明
// src/types/components.d.ts
declare module 'vue' {
  export interface GlobalComponents {
    BaseButton: typeof import('./components/BaseButton.vue')['default']
  }
}
```

---

### 三、**工程化实施**

#### 1. **严格 ESLint 配置（.eslintrc.js）**

```javascript
module.exports = {
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unsafe-argument': 'error',
    'vue/require-prop-types': 'error',
    'vue/require-typed-emits': 'error',
  },
};
```

#### 2. **Vite 类型检查集成**

```bash
# 安装校验插件
npm i -D vite-plugin-checker

# vite.config.ts
import checker from 'vite-plugin-checker'

export default {
  plugins: [
    checker({
      typescript: true,
      vueTsc: true // Vue SFC 类型检查
    })
  ]
}
```

---

### 四、**高级类型技术应用**

#### 1. **模板字面量类型**

```typescript
type RouteName = `/dashboard/${'overview' | 'analytics' | 'settings'}`;

const navigate = (path: RouteName) => {
  /* ... */
};

navigate('/dashboard/analytics'); // ✅
navigate('/dashboard/users'); // 🚫 类型错误
```

#### 2. **条件类型工具**

```typescript
// 提取组件 emit 类型
type ExtractEmits<T> = T extends new () => {
  $emit: infer E;
}
  ? E
  : never;

// 使用示例
type MyEmits = ExtractEmits<typeof MyComponent>;
```

---

### 五、**执行路线图**

1. **基础搭建（Week 1-2）**

   - 配置 `strict: true` 的 tsconfig
   - 安装并配置 ESLint 类型规则
   - 建立 `/types` 核心类型目录

2. **组件改造（Week 3-4）**

   - 迁移所有组件到 `<script setup lang="ts">`
   - 替换所有 `defineProps` 为泛型形式
   - 添加组件全局类型声明

3. **API 层重构（Week 5）**

   - 实现后端 DTO 类型同步（OpenAPI 生成）
   - 创建 axios 响应拦截类型守卫

4. **状态管理升级（Week 6）**

   - 重写 Pinia store 的类型声明
   - 实现跨 store 调用的类型安全

5. **持续优化（Ongoing）**
   - 每月类型代码审查
   - 新增复杂类型技术分享会
   - 监控 `any` 类型使用趋势

---

### 六、**Vue 特定痛点解决方案**

**问题：** 模板内表达式类型检查  
**方案：** 使用 Volar + `vue-tsc` 组合

```bash
# 启用模板类型检查
npx vue-tsc --noEmit
```

**问题：** 第三方组件类型缺失  
**方案：** 创建增强声明文件

```typescript
// components.d.ts
declare module 'untyped-vue-component' {
  export interface ComponentProps {
    // 补充缺失的类型声明
    size?: 'sm' | 'md' | 'lg';
  }
}
```

---

**效果验证指标：**

1. 类型覆盖率 > 95%
2. `any` 使用率 < 1%
3. 运行时类型错误减少 70%+
4. 组件重构时间降低 40%
5. API 字段匹配错误归零

通过以上 Vue 3 专项实施方案，可在 2 个月内将项目升级为类型安全的现代化 Vue 代码库，显著提升长期维护效率和系统稳定性。
