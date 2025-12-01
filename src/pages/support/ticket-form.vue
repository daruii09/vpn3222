<template>
  <view class="ticket-form">
    <view class="card">
      <view class="form-row">
        <text class="label">标题</text>
        <input v-model="form.title" placeholder="请输入问题标题" />
      </view>
      <view class="form-row">
        <text class="label">分类</text>
        <picker mode="selector" :range="categories" range-key="label" @change="onCategoryChange">
          <view class="picker-value">{{ currentCategory.label }}</view>
        </picker>
      </view>
      <view class="form-row">
        <text class="label">联系方式</text>
        <input v-model="form.contact" placeholder="邮箱或 Telegram" />
      </view>
      <view class="form-row column">
        <text class="label">描述</text>
        <textarea v-model="form.content" placeholder="请详细描述遇到的问题" auto-height />
      </view>
      <button class="primary-btn" @click="submit">提交</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const categories = [
  { value: 'tech', label: '技术支持' },
  { value: 'billing', label: '账单问题' },
  { value: 'node', label: '节点与延迟' }
];

const currentCategory = ref(categories[0]);

const form = reactive({
  title: '',
  contact: '',
  content: '',
  category: currentCategory.value.value
});

const onCategoryChange = (event: UniHelper.PickerSelectorChangeEvent) => {
  const choice = categories[Number(event.detail.value)];
  currentCategory.value = choice;
  form.category = choice.value;
};

const submit = () => {
  if (!form.title || !form.content) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' });
    return;
  }
  uni.showToast({ title: '工单已提交', icon: 'none' });
  setTimeout(() => {
    uni.navigateBack();
  }, 800);
};
</script>

<style lang="scss" scoped>
.ticket-form {
  padding: 24rpx;
  background: #0f172a;
  min-height: 100vh;
  box-sizing: border-box;
}

.form-row {
  margin-bottom: 24rpx;
}

.form-row.column textarea {
  margin-top: 12rpx;
}

.label {
  display: block;
  color: #fff;
  margin-bottom: 12rpx;
}

input,
textarea {
  width: 100%;
  padding: 20rpx;
  border-radius: 12rpx;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(148, 163, 184, 0.2);
  color: #fff;
  box-sizing: border-box;
}

.picker-value {
  padding: 20rpx;
  border-radius: 12rpx;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(148, 163, 184, 0.2);
  color: #fff;
}

.primary-btn {
  width: 100%;
  background: linear-gradient(135deg, #2563eb, #22d3ee);
  color: #fff;
  border-radius: 12rpx;
  margin-top: 12rpx;
}
</style>

