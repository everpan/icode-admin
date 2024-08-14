import {
  type Router,
  createRouter,
  type RouterHistory,
  type RouteRecordRaw
} from "vue-router";

export const myCreateRouter = (
  history: RouterHistory,
  routes: RouteRecordRaw[]
): Router => {
  return createRouter({
    history,
    routes,
    strict: true,
    scrollBehavior(to, from, savedPosition) {
      return new Promise(resolve => {
        if (savedPosition) {
          return savedPosition;
        } else {
          if (from.meta.saveSrollTop) {
            const top: number =
              document.documentElement.scrollTop || document.body.scrollTop;
            resolve({ left: 0, top });
          }
        }
      });
    }
  });
};
