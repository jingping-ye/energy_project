import service from './axios';

// 如果只在一个地方用，就不用额外声明类型
interface ResponseData {
  code: number;
  data: any;
  message: string;
}

export function get(url: string, params?: any): Promise<ResponseData> {
  return service.get(url, { params });
}

export function post(url: string, params?: any): Promise<ResponseData> {
  return service.post(url, { params });
}
