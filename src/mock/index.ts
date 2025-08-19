import Mock from "mockjs";
import { menulist, menulist2, chargingStation } from "./data";
Mock.setup({
  timeout: "200-600", // 设置延迟时间
});

// 登录接口
Mock.mock("https://www.demo.com/login", "post", (option: any) => {
  // 前端发送过来的参数 options.body，纯字符串
  const { username, password } = JSON.parse(option.body)["params"];
  if (username === "admin" && password === "666666") {
    return {
      code: 200,
      message: "登录成功",
      data: {
        token: "asdadad6tduiapso5as78dsad",
        user: {
          username: "张合",
          roles: ["admin"],
        },
        menulist: menulist,
      },
    };
  } else if (username === "user" && password === "123456") {
    return {
      code: 200,
      message: "登录成功",
      data: {
        token: "aidajdjaldjakjdaljd",
        user: {
          username: "江丽",
          roles: ["user"],
        },
        menulist: menulist2,
      },
    };
  } else {
    return {
      code: 403,
      message: "用户名和密码错误",
      data: {},
    };
  }
});

// 折线图数据
Mock.mock("https://www.demo.com/lineChartData", "get", () => {
  return {
    code: 200,
    message: "操作成功",
    list: [
      {
        name: "充电量",
        data: [20, 50, 30, 70, 60, 80, 40, 60, 50],
      },
      {
        name: "充电时长",
        data: [40, 60, 50, 80, 70, 90, 60, 70, 80],
      },
      {
        name: "充电功率",
        data: [30, 40, 60, 50, 70, 20, 30, 40, 60],
      },
    ],
  };
});

// 饼图数据
Mock.mock("https://www.demo.com/pieChartData", "get", () => {
  return {
    code: 200,
    message: "操作成功",
    list: [
      { value: 35, name: "充电桩" },
      { value: 30, name: "充电站" },
      { value: 25, name: "充电杆" },
    ],
  };
});

// 雷达图数据
Mock.mock("https://www.demo.com/radarChartData", "get", () => {
  return {
    code: 200,
    message: "操作成功",
    list: [42, 30, 200, 350, 500, 180],
  };
});

// 充电站监控数据
Mock.mock("https://www.demo.com/stationList", "post", (options: any) => {
  // 需要过滤的数据
  // 每次都重新获取，防止有新增的数据
  let chargingStationFiltered = JSON.parse(JSON.stringify(chargingStation));
  const { id, name, status, currentPage, pageSize } = options.body
    ? JSON.parse(options.body)["params"]
    : {};

  /*** 过滤 ***/
  // id
  if (id) {
    chargingStationFiltered = chargingStationFiltered.filter(
      (item) => item.id === id
    );
  }

  // 名称
  if (name) {
    chargingStationFiltered = chargingStationFiltered.filter((item) =>
      item.name.includes(name)
    );
  }

  // 状态
  if (status) {
    chargingStationFiltered = chargingStationFiltered.filter(
      (item) => item.status === Number(status)
    );
  }

  /*** 分页 ***/
  const total = chargingStation.length;
  const offsetSize = (currentPage - 1) * pageSize; // 开始记录数
  const list = chargingStationFiltered.slice(offsetSize, offsetSize + pageSize);
  return {
    code: 200,
    success: true,
    data: {
      list: list,
      pagination: {
        currentPage,
        pageSize,
        total,
      },
    },
  };
});
