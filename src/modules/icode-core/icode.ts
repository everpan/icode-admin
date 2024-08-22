/**
 * 以vue3为主的框架
 * 这里创建公用的构件实例
 */

import type { Component } from "vue";
import type { Router } from "vue-router";
import type { Pinia } from "pinia";
import axios from "axios";
import type { IICode } from "./types";

function instCacheMV(
  instances: any,
  module: string,
  version: string,
  inst: any
) {
  instances[`${module}-${version}`] = inst;
}
function genModulePath(base: string, module: string, version: string): string {
  return `${base}/${module}-${version}`;
}

export class ICode implements IICode {
  app: Component;
  store: Pinia;
  router: Router;
  instances: Record<string, any>;
  config: Record<string, any>;
  defaultValues: Record<string, any>;
  globalConfig: Record<string, any>;
  constructor() {
    this.instances = {};
    this.config = {};
    this.defaultValues = {};
    this.globalConfig = {};
  }
  static loadCSS(path: string) {
    let href = `${path}/style.css`;
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    let head = document.getElementsByTagName("head")[0];
    head.appendChild(link);
  }

  inject({ app, router, store, layout }) {
    this.app = app;
    this.router = router;
    this.store = store;
    this.defaultValues["layout"] = layout;
  }
  enableGlobal() {
    window.iCode = this;
  }
  async loadGlobalConfig(url: string, cb: any) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const _this = this;
      const { data: config } = await axios({ method: "get", url });
      let base = config?.icode.rootPath;
      if (!base) {
        throw "配置中未发现`icode.rootPath`配置项目";
      }
      let modules = config?.modules;
      if (!modules) {
        throw "配置中未发现`modules`配置项目";
      }
      let fwConf = config.icode.framework;
      if (!fwConf) {
        throw "配置中未发现`icode.framework`配置项目";
      }
      Object.assign(this.globalConfig, config);
      await _this.importModule(base, fwConf.name, fwConf.version, cb);
      try {
        modules.forEach(module => {
          _this.importModule(base, module.name, module.version, cb);
        });
      } catch (e) {
        console.error(e);
        throw e;
      }
      return config;
    } catch {
      throw `请在public文件夹下添加 ${url} 配置文件`;
    }
  }

  registeRoutes(routes: Array<RouteConfigsTable>) {
    const layout = this.defaultValues["layout"];
    routes.forEach(r => {
      if (!r.component) {
        r.component = layout;
      }
      this.router.addRoute(r as any);
    });
  }

  async importModule(base: string, module: string, version: string, cb: any) {
    let path = genModulePath(base, module, version);
    let src = `${path}/${module}.js`;
    let entryInst = await import(src);
    let inst = entryInst.default as EntryInfo;
    instCacheMV(this.instances, module, version, inst);
    if (inst.type === "framework") {
      this.inject(inst.extra.resources());
    } else {
      if (!this.defaultValues["layout"]) {
        throw new Error("未发现 framework, 应放置于modules顶部");
      }
    }
    if (inst.init) {
      try {
        inst.init(this.router, this.store, inst.config);
      } catch (e) {
        console.error(`init ${inst.name}-${inst.version} error: ${e}`);
      }
    }
    if (inst.routes) {
      this.registeRoutes(inst.routes);
    }
    if (cb) {
      try {
        cb(inst);
      } catch (e) {
        console.error(`callback ${inst.name}-${inst.version} error: ${e}`);
      }
    }
    if (inst.config?.style) {
      ICode.loadCSS(path);
    }
  }
}

export const iCode = new ICode();
