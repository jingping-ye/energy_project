/**
 * 固定路由
 */
import type { RouteRecordRaw } from 'vue-router';
const fixedRoutes: RouteRecordRaw[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
  },
  {
    name: 'Monitor',
    path: '/charging-station/monitor',
    component: () => import('@/views/charging-station/Monitor.vue'),
  },
  {
    name: 'Revenue',
    path: '/charging-station/revenue',
    component: () => import('@/views/charging-station/Revenue.vue'),
  },
  {
    name: 'Pile',
    path: '/charging-station/pile',
    component: () => import('@/views/charging-station/Pile.vue'),
  },
  {
    name: 'Map',
    path: '/map',
    component: () => import('@/views/map/ElectroncMap.vue'),
  },
  {
    name: 'Order',
    path: '/order',
    component: () => import('@/views/order/Order.vue'),
  },
  {
    name: 'Detail',
    path: '/order/detail',
    component: () => import('@/views/order/OrderDetail.vue'),
  },
  {
    name: 'Total',
    path: '/order/total',
    component: () => import('@/views/order/OrderTotal.vue'),
  },
  {
    name: 'Alarm',
    path: '/alarm',
    component: () => import('@/views/alarm/Alarm.vue'),
  },
  {
    name: 'Membership',
    path: '/membership',
    component: () => import('@/views/membership/Membership.vue'),
  },
  {
    name: 'Investment',
    path: '/investment',
    component: () => import('@/views/investment/Investment.vue'),
  },
  {
    name: 'System',
    path: '/system',
    component: () => import('@/views/system/System.vue'),
    meta: {
      needAuth: ['admin', 'manager'],
    },
  },
  {
    name: 'Personal',
    path: '/personal',
    component: () => import('@/views/personal/Personal.vue'),
  },
];
export default fixedRoutes;
