<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" v-if="wasCreated" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts" name="Main">
  import { nextTick, ref, watch } from "vue";
  //使用layout仓库
  import useLayoutSettingStore from "@/store/modules/setting";
  let LayoutSettingStore = useLayoutSettingStore();
  //创建一个变量控制组件的销毁和创建
  let wasCreated = ref(true);
  //监听仓库内部refresh数据是否变化,若变化,说明点击了刷新按钮
  watch(
    //监视refrsh数据
    () => LayoutSettingStore.refresh,
    //当refrsh数据改变时,v-if = false 销毁组件
    () => {
      wasCreated.value = false;
      //销毁组件后页面会重新渲染,此时触发nextTick方法,v-if = true 再创建组件
      //此处也可使用onUnmounted钩子实现相同功能
      nextTick(() => {
        wasCreated.value = true;
      });
    },
  );
</script>
<script lang="ts">
  export default {
    name: "Main",
  };
</script>

<style scoped>
  .fade-enter-from {
    opacity: 0;
  }
  .fade-enter-active {
    transition: all 1s;
  }
  .fade-enter-to {
    opacity: 1;
  }
</style>
