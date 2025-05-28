<template>
  <div class="tabbar-left">
    <!-- 左侧图标 -->
    <el-icon @click="changeIcon" size="30" style="margin-right: 10px">
      <component
        :is="LayoutSettingStore.isfold ? 'Expand' : 'Fold'"></component>
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
      <!-- 需要动态展示路由名字和标题 -->
      <el-breadcrumb-item
        v-for="(item, index) in $route.matched"
        :key="index"
        :to="item.path"
        v-show="!(item.meta.title == 'layout')">
        <!-- 面包屑路由标题的图标 -->
        <el-icon style="vertical-align: middle; margin-right: 5px">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <!-- 面包屑展示匹配路由的标题 -->
        <span style="vertical-align: middle">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts" name="Breadcrumb">
  //使用layout仓库获取数据
  import useLayoutSettingStore from "@/store/modules/setting";
  //引入路由获取当前组件的路由信息
  import { useRoute } from "vue-router";
  //获取路由信息
  let $route = useRoute();
  //获取是否折叠的变量
  let LayoutSettingStore = useLayoutSettingStore();

  //根据是否折叠控制图标样式
  //顶部导航栏左侧图标的改变事件
  function changeIcon() {
    LayoutSettingStore.isfold = !LayoutSettingStore.isfold;
  }
</script>
<script lang="ts">
  export default {
    name: "Breadcrumb",
  };
</script>

<style scoped lang="scss">
  .tabbar-left {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
</style>
