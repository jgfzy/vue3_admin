<template>
  <div class="layout-container">
    <!-- 左侧菜单 -->
    <div class="layout-sidebar">
      <!-- logo组件 -->
      <Logo></Logo>
      <!--滚动组件-->
      <el-scrollbar class="el-scrollbar">
        <el-menu
          :default-active="$route.path"
          background-color="#001529"
          text-color="#fff">
          <!-- 每一个菜单项 -->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout-tabbar">
      <!-- 顶部导航的tabbar -->
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区 -->
    <div class="layout-main">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts" name="Layout">
  //获取路由对象
  import { useRoute } from "vue-router";
  //引入logo组件
  import Logo from "./logo/index.vue";
  //引入菜单组件
  import Menu from "./menu/index.vue";
  //引入顶部tabbar
  import Tabbar from "./tabbar/index.vue";
  //引入内容展示区组件
  import Main from "./main/index.vue";
  //引入仓库
  import useUserStore from "@/store/modules/user";
  //使用仓库获取路由信息
  let userStore = useUserStore();
  //获取当前路由的信息，用于获取当前路径，为组件设置默认激活菜单
  let $route = useRoute();
</script>
<script lang="ts">
  export default {
    name: "Layout",
  };
</script>

<style scoped lang="scss">
  .layout-container {
    width: 100%;
    height: 100vh;
    background-color: white;
    .layout-sidebar {
      color: white;
      width: $base-menu-width;
      height: 100vh;
      background-color: $base-menu-bgc;
      .el-scrollbar {
        width: 100%;
        height: calc(100vh - $base-tabbar-height);
        .el-menu {
          border-right: none;
        }
      }
    }

    .layout-tabbar {
      position: fixed;
      width: calc(100% - $base-menu-width);
      height: $base-tabbar-height;
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
