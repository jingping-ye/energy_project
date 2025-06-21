/**
 * 导航守卫
 */
import router from './index';
import { useUserStore } from '@/store/auth.store';

router.beforeEach((to) => {
  const userStore = useUserStore();
  const isLogin = userStore.token; // 用token是否存在判断是否登录
  if (isLogin) {
    if (to.path === '/login') {
      return { path: '/' };
    }
    // 判断权限：如果没有权限，就重定向到首页
    if (to.meta?.needAuth && !userStore.roles.some((role: string) => (to.meta.needAuth as string[]).includes(role))) {
      return { path: '/' };
    }
  } else {
    if (to.path !== '/login') {
      return { path: '/login' };
    }
  }
});
