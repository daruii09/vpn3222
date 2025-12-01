<template>
  <scroll-view class="support" scroll-y>
    <view class="card section">
      <text class="section-title">公告中心</text>
      <view class="notice" v-for="notice in notices" :key="notice.id">
        <text class="notice-title">{{ notice.title }}</text>
        <text class="notice-meta">{{ notice.date }} · {{ notice.type }}</text>
        <text class="notice-content">{{ notice.content }}</text>
      </view>
    </view>

    <view class="card section">
      <text class="section-title">工单</text>
      <view class="ticket" v-for="ticket in tickets" :key="ticket.id">
        <view>
          <text class="ticket-title">{{ ticket.title }}</text>
          <text class="ticket-meta">{{ ticket.created }} · {{ ticket.category }}</text>
        </view>
        <text class="ticket-status" :class="ticket.status">{{ statusCopy(ticket.status) }}</text>
      </view>
      <button class="primary-btn" @click="createTicket">新建工单</button>
    </view>

    <view class="card section">
      <text class="section-title">常见问题</text>
      <view class="faq" v-for="faq in faqs" :key="faq.q">
        <text class="faq-q">{{ faq.q }}</text>
        <text class="faq-a">{{ faq.a }}</text>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const notices = reactive([
  { id: 1, title: '香港 CN2 节点维护', date: '12-01 10:00', type: '维护', content: '12:00-14:00 停机优化，其他线路不受影响。' },
  { id: 2, title: '黑五充值返现', date: '11-25 09:00', type: '活动', content: '单笔满 ¥99 返 20%，活动截至 12-05。' }
]);

const tickets = reactive([
  { id: 1, title: 'WireGuard 无法连接', created: '11-28', category: '技术支持', status: 'processing' },
  { id: 2, title: '订单重复扣款', created: '11-15', category: '账单', status: 'resolved' }
]);

const faqs = reactive([
  { q: '如何选择最优节点？', a: '优先选择地理位置近、延迟低、倍率为 1x 的节点，繁忙节点请切换备用线路。' },
  { q: 'WireGuard 配置如何导入手机？', a: '在配置中心生成后，使用官方 APP 扫描二维码即可导入。' },
  { q: '如何开启到期提醒？', a: '在套餐页面打开推送或绑定邮箱/Telegram Bot。' }
]);

const statusCopy = (status: string) => {
  switch (status) {
    case 'processing':
      return '处理中';
    case 'resolved':
      return '已解决';
    default:
      return '待处理';
  }
};

const createTicket = () => {
  uni.navigateTo({
    url: '/pages/support/ticket-form'
  });
};
</script>

<style lang="scss" scoped>
.support {
  padding: 24rpx;
  background: #0f172a;
  min-height: 100vh;
  box-sizing: border-box;
}

.notice {
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  padding: 20rpx 0;
}

.notice-title {
  font-size: 32rpx;
  color: #fff;
}

.notice-meta {
  font-size: 24rpx;
  color: $muted-text;
}

.notice-content {
  display: block;
  margin-top: 8rpx;
  color: #cbd5f5;
}

.ticket {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  padding: 20rpx 0;
}

.ticket-title {
  color: #fff;
  font-size: 30rpx;
}

.ticket-meta {
  color: $muted-text;
  font-size: 24rpx;
}

.ticket-status {
  align-self: center;
  padding: 6rpx 20rpx;
  border-radius: 999rpx;
}

.ticket-status.processing {
  background: rgba(251, 191, 36, 0.15);
  color: #fbbf24;
}

.ticket-status.resolved {
  background: rgba(34, 197, 94, 0.15);
  color: #34d399;
}

.faq {
  padding: 18rpx 0;
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
}

.faq-q {
  color: #fff;
  font-weight: 600;
}

.faq-a {
  display: block;
  color: $muted-text;
  margin-top: 8rpx;
}

.primary-btn {
  margin-top: 16rpx;
  background: linear-gradient(135deg, #2563eb, #22d3ee);
  color: #fff;
  border-radius: 12rpx;
}
</style>

