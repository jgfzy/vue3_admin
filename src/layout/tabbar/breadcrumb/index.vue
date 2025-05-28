<template>
  <div class="tabbar-left">
    <!-- 左侧图标 -->
    <el-icon class="tabbar-left-icon" @click="changeIcon">
      <component :is="isfold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts" name="Breadcrumb">
  import { ref } from "vue";

  //定义变量，根据是否折叠控制图标样式
  let isfold = ref(false);
  //顶部导航栏左侧图标的改变事件
  function changeIcon() {
    isfold.value = !isfold.value;
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
