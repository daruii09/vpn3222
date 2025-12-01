# VPN H5 Front-End (uni-app)

基于 uni-app + Vue 3 + Pinia 的 VPN 管理控制台前端，主要面向 H5 端，可同时编译至小程序/APP。

## 功能概览

- 仪表盘：套餐状态、实时流量、快捷操作卡片
- 节点选择：按地区/协议筛选，查看延迟与负载
- 配置中心：管理设备、生成 WireGuard/V2Ray 配置
- 套餐账单：当前套餐、套餐列表、支付记录
- 客服支持：公告、工单、FAQ、工单表单
- 账号中心：个人信息、安全设置、订阅/API 管理

## 开发步骤

```bash
# 安装依赖
npm install

# H5 调试
npm run dev:h5

# H5 构建
npm run build:h5
```

> 首次使用需安装 Node.js (建议 18+) 与 npm。若需要多端构建，请参考 [uni-app 官方文档](https://uniapp.dcloud.net.cn/).

## 接口对接

- API 基地址临时存放在 `uni.setStorageSync('API_BASE')`
- 统一请求封装位于 `src/api/client.ts`
- 用户/订阅数据示例在 `src/store/user.ts` 中，可替换为真实接口

## 目录结构

```
vpn-h5/
├── src/
│   ├── App.vue
│   ├── main.ts
│   ├── pages.json
│   ├── manifest.json
│   ├── pages/
│   ├── store/
│   ├── api/
│   └── styles/
└── static/icons
```

## 下一步建议

1. 接入真实登录流程、用户信息接口
2. 使用图表库（ECharts / uCharts）绘制实时数据
3. 将节点/套餐等静态数据替换为 API 返回
4. 接入 uni-ui 或自定义组件库提高复用

