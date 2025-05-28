//仓库：layout相关仓库
import { defineStore } from "pinia";

let useLayoutSettingStore = defineStore("LayoutSettingStore", {
  state() {
    return {
      //左侧菜单是否折叠
      isfold: false,
    };
  },
});
export default useLayoutSettingStore;
