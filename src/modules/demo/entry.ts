export default {
  name: "demo",
  version: "0.0.1",
  describtion: "dem0",
  routes: [],
  config: {},
  type: "component",
  async init(_router, _store, conf: any = this.config) {
    console.log(conf);
  }
} satisfies EntryInfo;
