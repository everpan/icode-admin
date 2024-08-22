import welcome from "@/views/welcome/index.vue";
const routes = [
  {
    path: "/demo",
    redirect: "/demo/d1",
    children: [
      {
        path: "d1",
        component: welcome
      },
      {
        path: "d2",
        component: () => import("@/views/welcome/index.vue")
      }
    ]
  }
] satisfies Array<RouteConfigsTable>;
export default {
  name: "demo",
  version: "0.0.1",
  description: "dem0",
  routes,
  config: {},
  type: "component",
  async init(_router, _store, conf: any = this.config) {
    console.log(conf);
  }
} satisfies EntryInfo;
