import { get } from '@/utils/http';

// 集中管理所有的路径
// 使用枚举类型，存储路径
enum API {
  ChartData = '/chartData',
}

/**
 * 图表数据
 * @param data
 * @returns
 */
export function getChartData(): Promise<any> {
  return get(API.ChartData);
}
