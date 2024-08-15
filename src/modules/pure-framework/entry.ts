import { $t } from "@/plugins/i18n";
import { appMount } from "./main";

export default {
  name: "pure-framework",
  version: "0.1.0",
  describtion: "icode-admin 框,继承自pure admin",
  routes: [],
  sysRoutes: [],
  type: "framework",
  config: {
    appMount,
    title: "iCode Admin" + $t("menus.pureHome")
  }
};
