<template>
  <div class="tabbar">
    <!--顶部左侧-->
    <Breadcrumb></Breadcrumb>
    <!-- 顶部右侧 -->
    <Setting></Setting>
  </div>
</template>

<script setup lang="ts" name="Tabbar">
  import Breadcrumb from "./breadcrumb/index.vue";
  import Setting from "./setting/index.vue";
</script>
<script lang="ts">
  export default {
    name: "Tabbar",
  };
</script>

<style scoped lang="scss">
  .tabbar {
    width: 100%;
    height: 100%;
    //background-color: orange;
    display: flex;
    justify-content: space-between;
  }
</style>
