/**
 * 以vue3为主的框架
 * 这里创建公用的构件实例
 */

import type { Component } from "vue";
import type { Router } from "vue-router";
import type { Pinia } from "pinia";
export class ICode {
  app: Component;
  store: Pinia;
  router: Router;
  insts: Record<string, any>;
  config: Record<string, any>;
  defaultValues: Record<string, any>;
  globalConfig: Record<string, any>;
  constructor() {
    this.insts = {};
    this.config = {};
    this.defaultValues = {};
    this.globalConfig = {};
  }
  inject(app, router, store) {
    this.app = app;
    this.router = router;
    this.store = store;
  }
  enableGlobal() {
    window.iCode = this;
  }
}
export const iCode = new ICode();
