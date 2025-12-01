<template>
  <scroll-view class="config" scroll-y>
    <view class="card section">
      <text class="section-title">设备管理</text>
      <view class="device" v-for="device in devices" :key="device.id">
        <view>
          <text class="device-name">{{ device.name }}</text>
          <text class="device-meta">{{ device.platform }} · 上次使用 {{ device.lastUsed }}</text>
        </view>
        <switch :checked="device.active" @change="toggleDevice(device)" />
      </view>
      <button class="ghost-btn" @click="addDevice">添加设备</button>
    </view>

    <view class="card section">
      <text class="section-title">配置生成</text>
      <picker mode="selector" :range="protocolOptions" range-key="label" @change="onProtocolPick">
        <view class="picker-row">
          <text>协议</text>
          <text class="picker-value">{{ currentProtocol.label }}</text>
        </view>
      </picker>
      <picker mode="selector" :range="nodeOptions" range-key="label" @change="onNodePick">
        <view class="picker-row">
          <text>节点</text>
          <text class="picker-value">{{ currentNode.label }}</text>
        </view>
      </picker>
      <button class="primary-btn" @click="generateConfig">生成配置</button>
    </view>

    <view class="card section" v-if="configResult">
      <text class="section-title">配置结果</text>
      <text selectable class="config-block">{{ configResult }}</text>
      <view class="config-actions">
        <button class="ghost-btn" @click="copyConfig">复制</button>
        <button class="ghost-btn" @click="downloadConfig">下载</button>
        <button class="primary-btn" @click="showQRCode">二维码</button>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

interface Device {
  id: number;
  name: string;
  platform: string;
  lastUsed: string;
  active: boolean;
}

const devices = reactive<Device[]>([
  { id: 1, name: 'iPhone 15 Pro', platform: 'iOS', lastUsed: '3 分钟前', active: true },
  { id: 2, name: 'MacBook Pro', platform: 'macOS', lastUsed: '昨天', active: true },
  { id: 3, name: 'Android 平板', platform: 'Android', lastUsed: '7 天前', active: false }
]);

const protocolOptions = reactive([
  { value: 'wireguard', label: 'WireGuard' },
  { value: 'v2ray', label: 'V2Ray' },
  { value: 'ssr', label: 'SSR' }
]);

const nodeOptions = reactive([
  { value: 'hk-cn2', label: '香港 · CN2' },
  { value: 'sg-iplc', label: '新加坡 · IPLC' },
  { value: 'jp-soft', label: '日本 · SoftBank' }
]);

const currentProtocol = ref(protocolOptions[0]);
const currentNode = ref(nodeOptions[0]);
const configResult = ref('');

const toggleDevice = (device: Device) => {
  device.active = !device.active;
  uni.showToast({ title: `${device.active ? '启用' : '停用'} ${device.name}`, icon: 'none' });
};

const addDevice = () => {
  uni.showToast({ title: '请前往客户端绑定新设备', icon: 'none' });
};

const onProtocolPick = (event: UniHelper.PickerSelectorChangeEvent) => {
  currentProtocol.value = protocolOptions[Number(event.detail.value)];
};

const onNodePick = (event: UniHelper.PickerSelectorChangeEvent) => {
  currentNode.value = nodeOptions[Number(event.detail.value)];
};

const generateConfig = () => {
  configResult.value = `[Interface]
PrivateKey = <自动生成>
Address = 10.0.${Math.floor(Math.random() * 255)}.2/24

[Peer]
PublicKey = <节点公钥>
Endpoint = ${currentNode.value.label}:51820
AllowedIPs = 0.0.0.0/0
`;
};

const copyConfig = () => {
  uni.setClipboardData({ data: configResult.value });
};

const downloadConfig = () => {
  uni.showToast({ title: 'H5 环境暂不支持下载，请复制配置', icon: 'none' });
};

const showQRCode = () => {
  uni.showToast({ title: '二维码功能可接入第三方组件', icon: 'none' });
};
</script>

<style lang="scss" scoped>
.config {
  padding: 24rpx;
  background: #0f172a;
  min-height: 100vh;
  box-sizing: border-box;
}

.device {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
}

.device:last-child {
  border-bottom: none;
}

.device-name {
  font-size: 32rpx;
  color: #fff;
}

.device-meta {
  font-size: 24rpx;
  color: $muted-text;
}

.picker-row {
  display: flex;
  justify-content: space-between;
  color: #fff;
  padding: 20rpx 0;
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
}

.picker-value {
  color: $muted-text;
}

.config-block {
  display: block;
  background: rgba(15, 23, 42, 0.9);
  padding: 24rpx;
  border-radius: 16rpx;
  font-family: 'JetBrains Mono', monospace;
  color: #34d399;
  margin-bottom: 16rpx;
  white-space: pre-wrap;
}

.config-actions {
  display: flex;
  gap: 16rpx;
}

.ghost-btn,
.primary-btn {
  flex: 1;
  border-radius: 12rpx;
}

.ghost-btn {
  border: 2rpx solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: #fff;
}

.primary-btn {
  background: linear-gradient(135deg, #2563eb, #22d3ee);
  color: #fff;
}
</style>

