import Mock from 'mockjs';
Mock.setup({
  timeout: '200-600', // 设置延迟时间
});

// 管理员权限菜单
const menulist = [
  {
    name: '数据看板',
    url: '/dashboard',
    icon: 'DataLine',
  },
  {
    name: '充电站管理',
    url: '/charging-station',
    icon: 'Lightning',
    children: [
      {
        name: '充电站监控',
        url: '/charging-station/monitor',
        icon: 'VideoCamera',
      },
      {
        name: '营收统计',
        url: '/charging-station/revenue',
        icon: 'DataAnalysis',
      },
      {
        name: '充电桩管理',
        url: '/charging-station/pile',
        icon: 'Warning',
      },
    ],
  },
  {
    name: '电子地图',
    url: '/map',
    icon: 'MapLocation',
  },
  {
    name: '运营管理',
    url: '/order',
    icon: 'Files',
    children: [
      {
        name: '订单管理',
        url: '/order',
        icon: 'DocumentCopy',
      },
      {
        name: '订单详情',
        url: '/order/detail',
        icon: 'Share',
      },
      {
        name: '计费管理',
        url: '/order/total',
        icon: 'Money',
      },
    ],
  },
  {
    name: '报警管理',
    url: '/alarm',
    icon: 'Phone',
  },
  {
    name: '会员卡管理',
    url: '/membership',
    icon: 'Magnet',
  },
  {
    name: '招商管理',
    url: '/investment',
    icon: 'Document',
  },
  {
    name: '系统设置',
    url: '/system',
    icon: 'Setting',
  },

  {
    name: '个人中心',
    url: '/personal',
    icon: 'User',
  },
];
//运营专员的菜单
const menulist2 = [
  {
    name: '数据看板',
    url: '/dashboard',
    icon: 'DataLine',
  },
  {
    name: '充电站管理',
    url: '/chargingstation',
    icon: 'Lightning',
    children: [
      {
        name: '充电站监控',
        url: '/charging-station/monitor',
        icon: 'VideoCamera',
      },
      {
        name: '营收统计',
        url: '/charging-station/revenue',
        icon: 'DataAnalysis',
      },
      {
        name: '充电桩管理',
        url: '/charging-station/pile',
        icon: 'Warning',
      },
    ],
  },
  {
    name: '电子地图',
    url: '/map',
    icon: 'MapLocation',
  },
  {
    name: '运营管理',
    url: '/order',
    icon: 'Files',
    children: [
      {
        name: '订单管理',
        url: '/order',
        icon: 'DocumentCopy',
      },
      {
        name: '订单详情',
        url: '/order/detail',
        icon: 'Share',
      },
      {
        name: '计费管理',
        url: '/order/total',
        icon: 'Money',
      },
    ],
  },
  {
    name: '报警管理',
    url: '/alarm',
    icon: 'Phone',
  },
  {
    name: '会员卡管理',
    url: '/membership',
    icon: 'Magnet',
  },
  {
    name: '个人中心',
    url: '/personal',
    icon: 'User',
  },
];

// 登录接口
Mock.mock('https://www.demo.com/login', 'post', (option: any) => {
  // 前端发送过来的参数 options.body，纯字符串
  const { username, password } = JSON.parse(option.body)['params'];
  console.log(option.body);
  if (username === 'admin' && password === '666666') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        token: 'asdadad6tduiapso5as78dsad',
        user: {
          username: '张合',
          roles: ['admin'],
        },
        menulist: menulist,
      },
    };
  } else if (username === 'user' && password === '123456') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        token: 'aidajdjaldjakjdaljd',
        user: {
          username: '江丽',
          roles: ['user'],
        },
        menulist: menulist2,
      },
    };
  } else {
    return {
      code: 403,
      message: '用户名和密码错误',
      data: {},
    };
  }
});


Mock.mock("https://www.demo.com/chartData",'get',()=>{
  return {
    code:200,
    message:"操作成功",
    list:[
      {
        name:"充电量",
        data:[20,50,30,70,60,80,40,60,50]
      },
      {
        name:"充电时长",
        data:[40,60,50,80,70,90,60,70,80]
      },
      {
        name:"充电功率",
        data:[30,40,60,50,70,20,30,40,60]
      }
    ]
  }
})