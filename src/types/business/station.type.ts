interface Station {
  name: string; // 站点名称
  id: string; // 站点ID
  city: string; // 所属城市
  person: string; // 站点负责人
  tel: string; // 负责人电话号码
  fast: string; // 快充数
  slow: string; // 慢充数
  status: number; // 充电站状态
  now: string; // 正在充电数
  fault: string; // 故障数
}

export type { Station };
