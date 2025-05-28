<template>
  <div class="tabbar-right">
    <!-- 右侧按钮 -->
    <el-button size="default" icon="Refresh" circle />
    <el-button size="default" icon="FullScreen" circle />
    <el-button size="default" icon="Setting" circle />
    <img class="right-img" src="../../../assets/vite.svg" alt="" />
    <!-- 下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        admin
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts" name="Setting"></script>
<script lang="ts">
  export default {
    name: "Setting",
  };
</script>

<style scoped lang="scss">
  .tabbar-right {
    display: flex;
    align-items: center;
    .right-img {
      margin: 0 10px;
    }
  }
</style>
