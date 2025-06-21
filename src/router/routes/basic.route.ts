import type { RouteRecordRaw } from 'vue-router';
import routesFixed from './bussiness.route';

const routes: RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    redirect: '/dashboard',
    component: () => import('@/components/layout/DefaultLayout.vue'),
    children: [...routesFixed],
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/Login.vue'),
  },
  {
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound.vue'),
  },
];

export default routes;
