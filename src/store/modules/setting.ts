//仓库：layout相关仓库
import { defineStore } from "pinia";

let useLayoutSettingStore = defineStore("LayoutSettingStore", {
  state() {
    return {
      //左侧菜单是否折叠
      isfold: false,
      //刷新按钮：是否刷新
      refresh: false,
    };
  },
});
export default useLayoutSettingStore;
