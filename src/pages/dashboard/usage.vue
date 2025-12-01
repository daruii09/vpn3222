<template>
  <scroll-view class="usage" scroll-y>
    <view class="card section">
      <text class="section-title">用量趋势</text>
      <view class="chart-placeholder">
        <text>图表占位，可使用 uCharts / ECharts</text>
      </view>
    </view>

    <view class="card section">
      <text class="section-title">设备用量</text>
      <view class="usage-row" v-for="item in deviceUsage" :key="item.device">
        <text>{{ item.device }}</text>
        <text>{{ item.data }} GB</text>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const deviceUsage = reactive([
  { device: 'iPhone 15 Pro', data: 120 },
  { device: 'MacBook Pro', data: 86 },
  { device: 'Android 平板', data: 40 }
]);
</script>

<style lang="scss" scoped>
.usage {
  padding: 24rpx;
  background: #0f172a;
  min-height: 100vh;
  box-sizing: border-box;
}

.chart-placeholder {
  height: 320rpx;
  border: 2rpx dashed rgba(148, 163, 184, 0.3);
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $muted-text;
}

.usage-row {
  display: flex;
  justify-content: space-between;
  padding: 16rpx 0;
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  color: #fff;
}
.usage-row:last-child {
  border-bottom: none;
}
</style>

