import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';

const service: AxiosInstance = axios.create({
  baseURL: 'https://www.demo.com', // TODO:替换成环境变量
  timeout: 5000,
});

/***
 * 请求拦截器
 * 参数1：请求内容
 * 参数2：处理错误的情况
 */
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    ElMessage({
      message: error.message,
      type: 'error',
    });
    return Promise.reject(error);
  }
);

/***
 * 响应拦截器
 * 参数1：响应内容
 * 参数2：处理错误情况
 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;
    console.log('response', response);
    // 以2开头，正常的响应数据
    if (data.code.toString().startsWith('2')) {
      return response.data;
    } else {
      ElMessage({
        message: data.message,
        type: 'error',
      });
      return Promise.reject(data);
    }
  },
  (error: AxiosError) => {
    ElMessage({
      message: error.message,
      type: 'error',
    });
    return Promise.reject(error);
  }
);

export default service;
