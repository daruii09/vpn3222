<template>
  <scroll-view class="account" scroll-y>
    <view class="card profile">
      <image class="avatar" src="https://dummyimage.com/120x120/2563eb/ffffff&text=VPN" mode="aspectFill" />
      <view>
        <text class="name">{{ profile.name }}</text>
        <text class="email">{{ profile.email }}</text>
        <text class="role">{{ profile.role }}</text>
      </view>
      <button class="ghost-btn" @click="logout">退出</button>
    </view>

    <view class="card section">
      <text class="section-title">安全</text>
      <view class="setting-row">
        <view>
          <text>二步验证</text>
          <text class="setting-sub">{{ profile.mfa ? '已开启' : '未开启' }}</text>
        </view>
        <switch :checked="profile.mfa" @change="toggleMfa" />
      </view>
      <view class="setting-row" @click="resetPassword">
        <text>修改密码</text>
        <text class="setting-sub">建议每 90 天更新一次</text>
      </view>
    </view>

    <view class="card section">
      <text class="section-title">API & 订阅</text>
      <view class="setting-row">
        <view>
          <text>订阅地址</text>
          <text class="setting-sub" selectable>{{ profile.subscriptionUrl }}</text>
        </view>
        <button class="ghost-btn" @click="resetSubscription">重置</button>
      </view>
      <view class="setting-row">
        <view>
          <text>API Token</text>
          <text class="setting-sub">{{ profile.apiToken }}</text>
        </view>
        <button class="ghost-btn" @click="copyToken">复制</button>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const profile = reactive({
  name: 'VPN Pro 用户',
  email: 'user@example.com',
  role: '普通用户',
  mfa: true,
  subscriptionUrl: 'https://api.example.com/subscription/abcdef',
  apiToken: 'pk_live_xxxxx'
});

const toggleMfa = () => {
  profile.mfa = !profile.mfa;
  uni.showToast({ title: profile.mfa ? '已开启 2FA' : '已关闭 2FA', icon: 'none' });
};

const resetPassword = () => {
  uni.showToast({ title: '请前往登录页操作', icon: 'none' });
};

const resetSubscription = () => {
  uni.showModal({
    title: '重置订阅地址',
    content: '重置后旧链接将失效，确认继续？',
    success: ({ confirm }) => {
      if (confirm) {
        profile.subscriptionUrl = 'https://api.example.com/subscription/' + Date.now();
        uni.showToast({ title: '已重置', icon: 'none' });
      }
    }
  });
};

const copyToken = () => {
  uni.setClipboardData({ data: profile.apiToken });
};

const logout = () => {
  uni.reLaunch({ url: '/pages/index/index' });
};
</script>

<style lang="scss" scoped>
.account {
  padding: 24rpx;
  background: #0f172a;
  min-height: 100vh;
  box-sizing: border-box;
}

.profile {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 60rpx;
}

.name {
  font-size: 34rpx;
  color: #fff;
}

.email,
.role {
  display: block;
  color: $muted-text;
}

.setting-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
}

.setting-row:last-child {
  border-bottom: none;
}

.setting-sub {
  display: block;
  color: $muted-text;
  font-size: 24rpx;
}

.ghost-btn {
  border: 2rpx solid rgba(255, 255, 255, 0.2);
  color: #fff;
  border-radius: 12rpx;
}
</style>

