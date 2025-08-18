import { get } from '@/utils/http';

// 集中管理所有的路径
// 使用枚举类型，存储路径
enum API {
  LineChartData = '/lineChartData',
  PieChartData = '/pieChartData',
  RadarChartData = '/radarChartData',
}

/**
 * 折线图数据
 * @param data
 * @returns
 */
export function getLineChartData(): Promise<any> {
  return get(API.LineChartData);
}

/**
 * 饼图数据
 * @param data
 * @returns
 */
export function getPieChartData(): Promise<any> {
  return get(API.PieChartData);
}

/**
 * 雷达图数据
 * @returns 
 */
export function getRadarChartData():Promise<any>{
  return get(API.RadarChartData);
}