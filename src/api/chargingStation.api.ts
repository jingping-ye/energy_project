import {post} from '@/utils/http';

enum API{
    StationList = "/stationList"
}

interface StationListRequestBody{
    currentPage:number;
    pageSize:number;
    name?:string;
    id?:string;
    status:number|string;
    [key:string]:any;
}

/**
 * 充电站监控数据
 * @returns 
 */
export function getStationListData(data:StationListRequestBody):Promise<any>{
  return post(API.StationList, data);
}
