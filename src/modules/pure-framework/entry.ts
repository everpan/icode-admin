import { appMount } from "./main";
import { resources } from "./main";

export default {
  name: "pure-framework",
  version: "0.1.0",
  describtion: "icode-admin框架,继承自pure admin",
  routes: [],
  sysRoutes: [],
  type: "framework",
  config: {
    rootContain: "#app",
    style: true // 本模块需要加载 style.css
  },
  extra: {
    resources
  },
  async init(_router, _store, conf: any = this.config) {
    // 保持调用风格一致，store router在本次实现中，无实际意义
    appMount(conf.rootContain);
  }
};
