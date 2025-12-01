<script setup lang="ts">
import { onLaunch, onShow } from '@dcloudio/uni-app';

onLaunch(() => {
  console.log('VPN H5 app launched');
});

onShow(() => {
  console.log('VPN H5 app show');
});
</script>

<style lang="scss">
@import '@/styles/theme.scss';

page {
  font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
  background-color: $bg-color;
  color: $text-color;
}
</style>

