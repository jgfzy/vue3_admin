<template>
  <div class="tabbar-right">
    <!-- 右侧按钮 -->
    <el-button size="default" icon="Refresh" circle @click="componentRefresh" />
    <el-button size="default" icon="FullScreen" circle @click="fullScreen" />
    <el-button size="default" icon="Setting" circle />
    <img class="right-img" :src="UserStore.avatar" />
    <!-- 下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ UserStore.username }}
        <el-icon>
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts" name="Setting">
  //使用layout仓库
  import useLayoutSettingStore from "@/store/modules/setting";
  //使用用户相关仓库
  import useUserStore from "@/store/modules/user";
  //引入router
  import { useRouter } from "vue-router";
  //引入route
  import { useRoute } from "vue-router";

  let LayoutSettingStore = useLayoutSettingStore();
  let UserStore = useUserStore();
  let $router = useRouter();
  let $route = useRoute();

  //当点击刷新按钮时,将改变刷新状态,在main组件中监视数据变化实现组件刷新功能
  function componentRefresh() {
    LayoutSettingStore.refresh = !LayoutSettingStore.refresh;
  }
  //全屏的功能,使用原生DOM实现
  function fullScreen() {
    //DOM对象的一个属性,判断当前是否处于全屏状态: false | true
    let isFullScreen = document.fullscreenElement;
    //进行判断实现全屏切换
    if (!isFullScreen) {
      //使用DOM对象根节点的全屏方法实现全屏
      document.documentElement.requestFullscreen();
    } else {
      //DOM方法退出全屏模式
      document.exitFullscreen();
    }
  }
  //用户退出登录的功能
  async function logOut() {
    //用户退出登录
    await UserStore.userLogOut();
    //跳转到登录页面
    $router.replace({
      path: "/login",
      query: {
        redirect: $route.path,
      },
    });
  }
</script>
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
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin: 0 10px;
    }
  }
</style>
