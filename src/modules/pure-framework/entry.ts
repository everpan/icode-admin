import { appMount } from "./main";

export default {
  name: "pure-framework",
  version: "0.1.0",
  describtion: "icode-admin 框,继承自pure admin",
  routes: [],
  sysRoutes: [],
  type: "framework",
  config: {
    rootContain: "#app"
  },
  async init(_store, _router, conf: any) {
    console.log("init", _store, _router, conf);
    appMount(conf.rootContain);
    conf.rootContain = "loaded";
  }
};
