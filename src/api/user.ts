import { post } from '@/utils/http';

// 集中管理所有的路径
// 使用枚举类型，存储路径
enum API {
  Login = '/login',
}

export interface LoginParams {
  username: string;
  password: string;
}

/**
 * 登录功能
 * @param data
 * @returns
 */
export function login(data: LoginParams): Promise<any> {
  return post(API.Login, data);
}
