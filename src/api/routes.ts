import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data: Array<any>;
};

export const getAsyncRoutes2 = () => {
  return http.request<Result>("get", "/get-async-routes");
};

const permissionRouter = {
  path: "/permission",
  meta: {
    title: "menus.purePermission",
    icon: "ep:lollipop",
    rank: 10
  },
  children: [
    {
      path: "/permission/page/index",
      name: "PermissionPage",
      meta: {
        title: "menus.purePermissionPage",
        roles: ["admin", "common"]
      }
    },
    {
      path: "/permission/button/index",
      name: "PermissionButton",
      meta: {
        title: "menus.purePermissionButton",
        roles: ["admin", "common"],
        auths: [
          "permission:btn:add",
          "permission:btn:edit",
          "permission:btn:delete"
        ]
      }
    }
  ]
};

export const getAsyncRoutes = () => {
  return new Promise(resolve => {
    resolve({
      success: true,
      data: [permissionRouter]
    });
  });
};
