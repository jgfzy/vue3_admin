<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item
        :index="item.path"
        v-if="!item.meta.hidden"
        @click="goRoute">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 只有一个子路由 -->
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item
        v-if="!item.meta.hidden"
        :index="item.children[0].path"
        @click="goRoute">
        <el-icon>
          <component :is="item.children[0].meta.icon"> </component
        ></el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有子路由 -->
    <el-sub-menu
      v-if="item.children && item.children.length > 1"
      :index="item.path">
      <template #title>
        <el-icon> <component :is="item.meta.icon"></component> </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts" name="Menu">
  import Menu from "./index.vue";
  import { useRouter } from "vue-router";
  //获取路由器对象
  let $router = useRouter();
  defineProps(["menuList"]);

  function goRoute(vc: any) {
    //根据路由放组件
    $router.push(vc.index);
  }
</script>
<script lang="ts">
  export default {
    name: "Menu",
  };
</script>

<style scoped></style>
