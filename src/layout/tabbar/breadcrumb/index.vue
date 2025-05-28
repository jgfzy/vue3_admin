<template>
  <div class="tabbar-left">
    <!-- 左侧图标 -->
    <el-icon class="tabbar-left-icon" @click="changeIcon">
      <component
        :is="LayoutSettingStore.isfold ? 'Expand' : 'Fold'"></component>
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts" name="Breadcrumb">
  //使用layout仓库获取数据
  import useLayoutSettingStore from "@/store/modules/setting";
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
    margin-left: 20px;
    .tabbar-left-icon {
      margin-right: 10px;
    }
  }
</style>
