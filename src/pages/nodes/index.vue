<template>
  <scroll-view class="nodes" scroll-y>
    <view class="filter card">
      <picker mode="selector" :range="regions" range-key="label" @change="onRegionChange">
        <view class="filter-item">
          <text class="label">地区</text>
          <text class="value">{{ selectedRegion?.label ?? '全部' }}</text>
        </view>
      </picker>
      <picker mode="selector" :range="protocols" range-key="label" @change="onProtocolChange">
        <view class="filter-item">
          <text class="label">协议</text>
          <text class="value">{{ selectedProtocol?.label ?? '全部' }}</text>
        </view>
      </picker>
    </view>

    <view class="node-list">
      <view class="card node-card" v-for="node in filteredNodes" :key="node.id">
        <view class="node-header">
          <text class="node-name">{{ node.name }}</text>
          <text class="node-status" :class="node.status">{{ statusText(node.status) }}</text>
        </view>
        <view class="node-meta">
          <text>{{ node.region }} · {{ node.protocol }}</text>
          <text>倍率 {{ node.multiplier }}x</text>
        </view>
        <view class="node-progress">
          <view class="node-progress__label">
            <text>延迟 {{ node.latency }} ms</text>
            <text>负载 {{ node.load }}%</text>
          </view>
          <view class="progress-bar">
            <view class="progress-inner" :style="{ width: node.load + '%'}"></view>
          </view>
        </view>
        <view class="node-actions">
          <button class="ghost-btn" @click="selectNode(node)">设为默认</button>
          <button class="primary-btn" @click="goConfig(node)">生成配置</button>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

type NodeStatus = 'online' | 'maintainance' | 'busy';

interface VpnNode {
  id: number;
  name: string;
  status: NodeStatus;
  region: string;
  protocol: string;
  latency: number;
  load: number;
  multiplier: number;
}

const regions = reactive([
  { value: '', label: '全部地区' },
  { value: '香港', label: '香港' },
  { value: '日本', label: '日本' },
  { value: '新加坡', label: '新加坡' },
  { value: '美国', label: '美国' }
]);

const protocols = reactive([
  { value: '', label: '全部协议' },
  { value: 'WireGuard', label: 'WireGuard' },
  { value: 'V2Ray', label: 'V2Ray' },
  { value: 'ShadowSocksR', label: 'SSR' }
]);

const selectedRegion = ref<(typeof regions)[number]>();
const selectedProtocol = ref<(typeof protocols)[number]>();

const nodes = reactive<VpnNode[]>([
  { id: 1, name: 'HK-CN2·A1', status: 'online', region: '香港', protocol: 'WireGuard', latency: 42, load: 36, multiplier: 1 },
  { id: 2, name: 'SG-IA·B2', status: 'busy', region: '新加坡', protocol: 'V2Ray', latency: 67, load: 82, multiplier: 1.2 },
  { id: 3, name: 'JP-OS·C5', status: 'maintainance', region: '日本', protocol: 'SSR', latency: 0, load: 0, multiplier: 1.5 },
  { id: 4, name: 'US-LA·D3', status: 'online', region: '美国', protocol: 'WireGuard', latency: 120, load: 55, multiplier: 1.3 }
]);

const filteredNodes = computed(() =>
  nodes.filter((node) => {
    const regionOk = !selectedRegion.value?.value || node.region === selectedRegion.value.value;
    const protocolOk = !selectedProtocol.value?.value || node.protocol === selectedProtocol.value.value;
    return regionOk && protocolOk;
  })
);

const onRegionChange = (event: UniHelper.PickerSelectorChangeEvent) => {
  const idx = Number(event.detail.value);
  selectedRegion.value = regions[idx] ?? regions[0];
};

const onProtocolChange = (event: UniHelper.PickerSelectorChangeEvent) => {
  const idx = Number(event.detail.value);
  selectedProtocol.value = protocols[idx] ?? protocols[0];
};

const statusText = (status: NodeStatus) => {
  switch (status) {
    case 'online':
      return '在线';
    case 'busy':
      return '繁忙';
    default:
      return '维护中';
  }
};

const selectNode = (node: VpnNode) => {
  uni.showToast({ title: `已设为默认：${node.name}`, icon: 'none' });
};

const goConfig = (node: VpnNode) => {
  uni.navigateTo({
    url: `/pages/config/index?node=${encodeURIComponent(node.name)}`
  });
};
</script>

<style lang="scss" scoped>
.nodes {
  padding: 24rpx;
  background: #0f172a;
  min-height: 100vh;
  box-sizing: border-box;
}

.filter {
  display: flex;
  justify-content: space-between;
  gap: 24rpx;
  margin-bottom: 24rpx;
}

.filter-item {
  flex: 1;
  background: rgba(15, 23, 42, 0.8);
  border-radius: 16rpx;
  padding: 20rpx;
}

.label {
  display: block;
  color: $muted-text;
  font-size: 24rpx;
}

.value {
  display: block;
  color: #fff;
  font-size: 32rpx;
  margin-top: 8rpx;
}

.node-card {
  margin-bottom: 24rpx;
}

.node-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.node-name {
  font-size: 34rpx;
  font-weight: 600;
  color: #fff;
}

.node-status {
  font-size: 24rpx;
  padding: 6rpx 20rpx;
  border-radius: 999rpx;
}

.node-status.online {
  background: rgba(34, 197, 94, 0.15);
  color: #34d399;
}

.node-status.busy {
  background: rgba(249, 115, 22, 0.15);
  color: #fb923c;
}

.node-status.maintainance {
  background: rgba(248, 113, 113, 0.15);
  color: #f87171;
}

.node-meta {
  display: flex;
  justify-content: space-between;
  margin: 16rpx 0;
  color: $muted-text;
}

.node-progress__label {
  display: flex;
  justify-content: space-between;
  color: $muted-text;
  font-size: 24rpx;
  margin-bottom: 12rpx;
}

.progress-bar {
  height: 16rpx;
  background: rgba(148, 163, 184, 0.2);
  border-radius: 16rpx;
}

.progress-inner {
  height: 100%;
  border-radius: 16rpx;
  background: linear-gradient(90deg, #22d3ee, #2563eb);
}

.node-actions {
  display: flex;
  gap: 16rpx;
  margin-top: 20rpx;
}

.ghost-btn {
  flex: 1;
  border: 2rpx solid rgba(255, 255, 255, 0.2);
  border-radius: 12rpx;
  color: #fff;
  background: transparent;
}

.primary-btn {
  flex: 1;
  background: linear-gradient(135deg, #2563eb, #22d3ee);
  color: #fff;
  border-radius: 12rpx;
}
</style>

