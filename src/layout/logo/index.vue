<template>
  <div class="logo">
    <img src="@/assets/vite.svg" />
    <p v-if="!LayoutSettingStore.isfold" class="logo-title">我的管理系统平台</p>
  </div>
</template>

<script setup lang="ts" name="Logo">
  //引入layout仓库
  import useLayoutSettingStore from "@/store/modules/setting";
  //获取isfold数据
  let LayoutSettingStore = useLayoutSettingStore();
  //为p标签设置v-if处理折叠时的显示情况
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
      animation: fadeIn 0.5s 0.3s forwards;
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
