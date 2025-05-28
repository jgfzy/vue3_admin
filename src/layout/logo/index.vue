<template>
  <div class="logo">
    <img src="../../assets/vite.svg" />
    <p v-if="!LayoutSettingStore.isfold" class="logo-title">
      {{ settings.logoTitle }}
    </p>
  </div>
</template>

<script setup lang="ts" name="Logo">
  //引入layout仓库
  import useLayoutSettingStore from "@/store/modules/setting";
  //引入settings页面设置
  import settings from "@/settings";
  //获取isfold数据
  let LayoutSettingStore = useLayoutSettingStore();
</script>
<script lang="ts">
  export default {
    name: "Logo",
  };
</script>

<style scoped lang="scss">
  .logo {
    width: 100%;
    height: $base-tabbar-height;
    color: white;
    display: flex;
    align-items: center;
    padding: 20px;
    img {
      width: $base-menu-logo-width;
      height: $base-menu-logo-height;
    }
    .logo-title {
      opacity: 0;
      font-size: $base-menu-title-fontSize;
      font-weight: bold;
      margin-left: 10px;
      //标题动画效果
      animation: fadeIn 500ms 300ms forwards;
    }
  }
  //设置标题动画效果
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
