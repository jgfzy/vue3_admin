<template>
  <div class="logo">
    <img src="../../../public/vite.svg" alt="图片显示失败" />
    <p>我的管理系统平台</p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .logo {
    width: 100%;
    height: $base-tabbar-height;
    color: white;
    display: flex;
    align-items: center;
    padding: 20px;
  }
  img {
    width: $base-menu-logo-width;
    height: $base-menu-logo-height;
  }
  p {
    font-size: $base-menu-title-fontSize;
    font-weight: bold;
    margin-left: 10px;
  }
</style>
