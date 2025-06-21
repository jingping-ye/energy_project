import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/styles/index.less'; // 引入所有样式
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { createPinia } from 'pinia';
import './mock';
import '@/router/routeGuard';

const app = createApp(App);

const pinia = createPinia();

// 使用element-plus库
app.use(ElementPlus);

// 注册icon图标为组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(pinia);
app.use(router);
app.mount('#app');
