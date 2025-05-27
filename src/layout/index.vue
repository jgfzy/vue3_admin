<template>
  <div class="layout-container">
    <!-- 左侧菜单 -->
    <div class="layout-sidebar">
      <!-- logo组件 -->
      <Logo></Logo>
      <!--滚动组件-->
      <el-scrollbar class="el-scrollbar">
        <el-menu background-color="#001529" text-color="#fff">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">数据大屏</el-menu-item>
          <!-- 折叠菜单 -->
          <el-sub-menu index="3">
            <template #title>
              <span>权限管理</span>
            </template>
            <el-menu-item index="3-1">用户管理</el-menu-item>
            <el-menu-item index="3-2">角色管理</el-menu-item>
            <el-menu-item index="3-3">菜单管理</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout-tabbar"></div>
    <!-- 内容展示区 -->
    <div class="layout-main"></div>
  </div>
</template>

<script setup lang="ts">
  //引入logo组件
  import Logo from "./logo/index.vue";
  //引入菜单组件
  import Menu from "./menu/index.vue";
</script>

<style scoped lang="scss">
  .layout-container {
    width: 100%;
    height: 100vh;
    background-color: orange;
    .layout-sidebar {
      width: $base-menu-width;
      height: 100vh;
      background-color: $base-menu-color;
      .el-scrollbar {
        height: calc(100vh - $base-tabbar-height);
        color: white;
      }
    }
    .layout-tabbar {
      position: fixed;
      width: calc(100% - $base-menu-width);
      height: $base-tabbar-height;
      background-color: cyan;
      top: 0px;
      left: $base-menu-width;
    }
    .layout-main {
      position: absolute;
      padding: 20px;
      width: calc(100% - $base-menu-width);
      height: calc(100vh - $base-tabbar-height);
      background-color: yellowgreen;
      left: $base-menu-width;
      top: $base-tabbar-height;
      overflow: auto;
    }
  }
</style>
