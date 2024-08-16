/**
 * 以vue3为主的框架
 * 这里创建公用的构件实例
 */
import { createApp } from "vue";
import App from "../../App.vue";
import { createPinia } from "pinia";
import { myCreateRouter } from "@/router/create";
import { getHistoryMode } from "@/router/utils";

const app = createApp(App);

const store = createPinia();
app.use(store);

const router = myCreateRouter(
  getHistoryMode(import.meta.env.VITE_ROUTER_HISTORY),
  []
);
const insts: Record<string, any> = {};
const config: Record<string, any> = {};
export const iCode = { app, store, router, insts, globalConfig: config };
