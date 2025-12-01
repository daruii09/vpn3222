<template>
  <scroll-view class="dashboard" scroll-y>
    <view class="hero card">
      <view>
        <text class="hero-label">当前套餐</text>
        <text class="hero-plan">{{ subscription.name }}</text>
        <text class="hero-meta">
          剩余 {{ subscription.remainingDays }} 天 · 可用 {{ subscription.remainingData }} GB
        </text>
      </view>
      <button class="hero-btn" @click="navigateTo('plan')">管理套餐</button>
    </view>

    <view class="grid">
      <view class="card tile" v-for="tile in tiles" :key="tile.label">
        <text class="tile-label">{{ tile.label }}</text>
        <text class="tile-value">{{ tile.value }}</text>
        <text class="tile-sub">{{ tile.sub }}</text>
      </view>
    </view>

    <view class="card section">
      <text class="section-title">实时流量</text>
      <view class="chart-placeholder">
        <text>流量曲线图占位 (接入后端后替换为真实图表)</text>
      </view>
    </view>

    <view class="card section">
      <text class="section-title">快捷操作</text>
      <view class="action-list">
        <button v-for="action in actions" :key="action.label" class="action-btn" @click="navigateTo(action.target)">
          <text>{{ action.label }}</text>
          <text class="action-sub">{{ action.desc }}</text>
        </button>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const subscription = reactive({
  name: '尊享 Pro',
  remainingData: 320,
  remainingDays: 18
});

const tiles = reactive([
  { label: '在线设备', value: '2', sub: '最多 5 台' },
  { label: '今日用量', value: '1.8 GB', sub: '较昨日 +12%' },
  { label: '活跃节点', value: '12 / 15', sub: '3 个维护中' },
  { label: '告警', value: '0', sub: '一切正常' }
]);

const actions = reactive([
  { label: '节点列表', desc: '查看延迟与负载', target: 'nodes' },
  { label: '配置中心', desc: '生成/导出配置', target: 'config' },
  { label: '到期提醒', desc: '订阅续费设置', target: 'plan' },
  { label: '联系客服', desc: '工单与公告', target: 'support' }
]);

const navigateTo = (page: string) => {
  uni.switchTab({
    url: `/pages/${page}/index`
  });
};
</script>

<style lang="scss" scoped>
.dashboard {
  padding: 32rpx;
  background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
  min-height: 100vh;
  box-sizing: border-box;
}

.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32rpx;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.9), rgba(14, 165, 233, 0.8));
  color: #fff;
}

.hero-label {
  font-size: 26rpx;
  opacity: 0.8;
}

.hero-plan {
  display: block;
  font-size: 48rpx;
  font-weight: 700;
  margin: 12rpx 0;
}

.hero-meta {
  font-size: 26rpx;
  opacity: 0.9;
}

.hero-btn {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  border-radius: 999rpx;
  padding: 12rpx 36rpx;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
  margin-bottom: 32rpx;
}

.tile {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.tile-label {
  color: $muted-text;
  font-size: 26rpx;
}

.tile-value {
  font-size: 40rpx;
  font-weight: 600;
  color: #fff;
}

.tile-sub {
  color: $muted-text;
  font-size: 24rpx;
}

.section {
  margin-bottom: 32rpx;
}

.chart-placeholder {
  height: 280rpx;
  border: 2rpx dashed rgba(148, 163, 184, 0.4);
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $muted-text;
}

.action-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.action-btn {
  flex: 1 1 calc(50% - 16rpx);
  background: rgba(15, 23, 42, 0.9);
  border-radius: 16rpx;
  padding: 24rpx;
  color: #fff;
  text-align: left;
}

.action-sub {
  display: block;
  font-size: 24rpx;
  color: $muted-text;
  margin-top: 6rpx;
}
</style>

