import PureLayout from "@/layout/index.vue";
import routes from "./routes";

export default {
  name: "pure-layout",
  version: "0.1.0",
  type: "layout",
  component: PureLayout,
  describtion: "icode-admin 默认布局，继承自pure admin",
  routes,
  sysRoutes: []
};
