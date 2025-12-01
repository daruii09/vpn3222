<template>
  <scroll-view class="plan" scroll-y>
    <view class="card section">
      <text class="section-title">当前套餐</text>
      <view class="current-plan">
        <text class="plan-name">{{ currentPlan.name }}</text>
        <text class="plan-meta">到期 {{ currentPlan.expireAt }} · 剩余 {{ currentPlan.remaining }} GB</text>
        <button class="primary-btn" @click="renewPlan">立即续费</button>
      </view>
    </view>

    <view class="card section">
      <text class="section-title">套餐列表</text>
      <view class="plan-card" v-for="plan in plans" :key="plan.id">
        <view>
          <text class="plan-name">{{ plan.name }}</text>
          <text class="plan-price">¥{{ plan.price }}/{{ plan.period }}</text>
        </view>
        <view class="plan-meta">
          <text>{{ plan.traffic }} GB · {{ plan.devices }} 台设备</text>
          <text>线路：{{ plan.features }}</text>
        </view>
        <button class="ghost-btn" @click="selectPlan(plan)">购买</button>
      </view>
    </view>

    <view class="card section">
      <text class="section-title">支付记录</text>
      <view class="bill" v-for="bill in bills" :key="bill.id">
        <view>
          <text class="bill-title">{{ bill.title }}</text>
          <text class="bill-meta">{{ bill.date }} · {{ bill.method }}</text>
        </view>
        <text class="bill-amount" :class="bill.status">{{ bill.amount }}</text>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const currentPlan = reactive({
  name: '尊享 Pro',
  expireAt: '2026-01-18',
  remaining: 320
});

const plans = reactive([
  { id: 1, name: '轻量 Basic', price: 19, period: '月', traffic: 100, devices: 2, features: '标准 BGP' },
  { id: 2, name: '尊享 Pro', price: 39, period: '月', traffic: 300, devices: 5, features: 'CN2 + IPLC' },
  { id: 3, name: '旗舰 Max', price: 99, period: '季', traffic: 1200, devices: 10, features: '全球专线' }
]);

const bills = reactive([
  { id: 1, title: '尊享 Pro 续费', date: '11-18 12:11', method: '微信支付', amount: '-¥39.00', status: 'paid' },
  { id: 2, title: '旗舰 Max 升级', date: '09-08 10:32', method: '支付宝', amount: '-¥99.00', status: 'paid' },
  { id: 3, title: '退款 · 轻量 Basic', date: '08-01 08:20', method: '原路退回', amount: '+¥19.00', status: 'refunded' }
]);

const renewPlan = () => {
  uni.showActionSheet({
    itemList: ['微信支付', '支付宝', 'Stripe'],
    success: ({ tapIndex }) => {
      uni.showToast({ title: `已选择支付方式 #${tapIndex + 1}`, icon: 'none' });
    }
  });
};

const selectPlan = (plan: (typeof plans)[number]) => {
  uni.showModal({
    title: '确认购买',
    content: `立即购买 ${plan.name} 套餐？`,
    success: ({ confirm }) => {
      if (confirm) {
        uni.showToast({ title: '模拟下单成功', icon: 'none' });
      }
    }
  });
};
</script>

<style lang="scss" scoped>
.plan {
  padding: 24rpx;
  background: #0f172a;
  min-height: 100vh;
  box-sizing: border-box;
}

.current-plan {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.plan-name {
  font-size: 34rpx;
  font-weight: 600;
  color: #fff;
}

.plan-meta {
  color: $muted-text;
  font-size: 26rpx;
}

.plan-price {
  font-size: 40rpx;
  color: $accent-color;
  font-weight: 600;
}

.plan-card {
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  padding: 24rpx 0;
}

.plan-card:last-child {
  border-bottom: none;
}

.bill {
  display: flex;
  justify-content: space-between;
  padding: 18rpx 0;
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
}

.bill:last-child {
  border-bottom: none;
}

.bill-title {
  color: #fff;
  font-size: 30rpx;
}

.bill-meta {
  color: $muted-text;
  font-size: 24rpx;
}

.bill-amount {
  font-weight: 600;
}

.bill-amount.paid {
  color: #f87171;
}

.bill-amount.refunded {
  color: #34d399;
}

.ghost-btn {
  margin-top: 12rpx;
  border: 2rpx solid rgba(255, 255, 255, 0.2);
  color: #fff;
}

.primary-btn {
  margin-top: 16rpx;
  background: linear-gradient(135deg, #2563eb, #22d3ee);
  color: #fff;
  border-radius: 12rpx;
}
</style>

