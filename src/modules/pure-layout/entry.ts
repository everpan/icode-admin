import PureLayout from "@/layout/index.vue";
import { $t } from "@/plugins/i18n";

const route = {
  path: "/",
  name: "Home",
  component: PureLayout,
  redirect: "/welcome",
  type: "layout",
  meta: {
    icon: "ep:home-filled",
    title: $t("menus.pureHome"),
    rank: 0
  }
} as RouteConfigsTable;

export default {
  name: "pure-layout",
  version: "0.1.0",
  describtion: "icode-admin 默认布局，继承自pure admin",
  routes: [route],
  sysRoutes: []
};
