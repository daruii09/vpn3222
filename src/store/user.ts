import { defineStore } from 'pinia';

interface SubscriptionState {
  name: string;
  expiresAt: string;
  remainingData: number;
}

interface UserProfile {
  id: number;
  name: string;
  email: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: null as UserProfile | null,
    subscription: null as SubscriptionState | null,
    loading: false
  }),
  actions: {
    async fetchProfile() {
      this.loading = true;
      try {
        await uni.request({
          url: '/api/v1/me'
        });
        // TODO: 接入真实接口
        this.profile = {
          id: 1,
          name: '演示用户',
          email: 'demo@example.com'
        };
        this.subscription = {
          name: '尊享 Pro',
          expiresAt: '2026-01-18',
          remainingData: 320
        };
      } finally {
        this.loading = false;
      }
    }
  }
});

