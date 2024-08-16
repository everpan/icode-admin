import { $t } from "@/plugins/i18n";

export default [
  {
    path: "/",
    name: "Home",
    // component: Layout,
    redirect: "/welcome",
    meta: {
      icon: "ep:home-filled",
      title: $t("menus.pureHome"),
      rank: 0
    },
    children: [
      {
        path: "/welcome",
        name: "Welcome",
        component: () => import("./views/welcome.vue"),
        meta: {
          title: $t("menus.pureHome"),
          showLink: true // VITE_HIDE_HOME === "true" ? false : true
        }
      }
    ]
  },
  {
    path: "/redirect",
    // component: Layout,
    meta: {
      title: $t("status.pureLoad"),
      showLink: false,
      rank: 102
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        name: "Redirect",
        component: () => import("@/layout/redirect.vue")
      }
    ]
  },
  {
    path: "/error",
    redirect: "/error/403",
    meta: {
      icon: "ri:information-line",
      // showLink: false,
      title: $t("menus.pureAbnormal"),
      rank: 9
    },
    children: [
      {
        path: "/error/403",
        name: "403",
        component: () => import("./views/403.vue"),
        meta: {
          title: $t("menus.pureFourZeroOne")
        }
      },
      {
        path: "/error/404",
        name: "404",
        component: () => import("./views/404.vue"),
        meta: {
          title: $t("menus.pureFourZeroFour")
        }
      },
      {
        path: "/error/500",
        name: "500",
        component: () => import("./views/500.vue"),
        meta: {
          title: $t("menus.pureFive")
        }
      }
    ]
  }
] satisfies Array<RouteConfigsTable>;
