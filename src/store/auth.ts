import { defineStore } from 'pinia';
import type { LoginParams } from '@/api/user';
import { login } from '@/api/user';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      // token 用户验证身份：用户名和密码
      // 令牌
      // 小区等级身份 =>  门禁卡
      token: sessionStorage.getItem('token') || '',
      roles: sessionStorage.getItem('roles') ? JSON.parse(sessionStorage.getItem('roles')!) : [], // 权限，按钮级别权限控制
      username: sessionStorage.getItem('username') || '', // 用户名
      menu: sessionStorage.getItem('menu') ? JSON.parse(sessionStorage.getItem('menu')!) : [], // 菜单信息 老板可以看到财务信息，但是你不可以
    };
  },
  actions: {
    async login(data: LoginParams) {
      try {
        const result = await login(data);
        console.log('result', result);
        const {
          data: {
            token,
            user: { username, roles },
            menulist,
          },
        } = result;
        this.token = token;
        this.username = username;
        this.roles = roles;
        this.menu = menulist;
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('roles', roles);
        sessionStorage.setItem('menu', menulist);
      } catch (error) {
        console.log('error', error);
      }
    },
  },
});
