import { iCode as icode } from "./icode";
import axios from "axios";
import type { Router } from "vue-router";

/**
 * import方法加载es模块
 * @param base 基地址
 * @param opt 模块设置
 */

export function importModule(
  base: string,
  opt: { name: string; version: string; style: boolean | string | null },
  cb: any | null = null
) {
  let path = genModulePath(base, opt.name, opt.version);
  Import(path, opt.name, opt.version, cb);
  if (opt.style) {
    loadCSS(path);
  }
}

function loadGlobalConfigCallback(config: any) {
  let modules = config.modules;
  let coreConfig = config.iCodeCore;
  if (modules) {
    modules.forEach(module => {
      importModule(coreConfig.rootPath, module);
    });
  } else {
    throw "配置中未发现`modules`配置项目";
  }
}

export async function loadGlobalConfig(url: string, cb: any) {
  try {
    const { data: config } = await axios({
      method: "get",
      url
    });
    Object.assign(icode.globalConfig, config);
    if (cb) {
      cb(config);
    } else {
      try {
        loadGlobalConfigCallback(config);
      } catch (e) {
        throw e;
      }
    }
    return config;
  } catch {
    throw `请在public文件夹下添加 ${url} 配置文件`;
  }
}

function genModulePath(base: string, module: string, version: string): string {
  return `${base}/${module}-${version}`;
}

function Import(path: string, module: string, version: string, cb: any) {
  let src = `${path}/${module}.js`;
  import(src).then(entryInst => {
    let inst = entryInst.default;
    instCacheMV(icode.insts, module, version, inst);
    if (inst.type === "layout") {
      icode.defaultValues["layout"] = inst.getLayout();
    }
    if (inst.init) {
      try {
        inst.init(icode.store, icode.router, inst.config);
      } catch (e) {
        console.error(`init ${inst.name}-${inst.version} error: ${e}`);
      }
    }
    if (cb) {
      try {
        cb(inst);
      } catch (e) {
        console.error(`callback ${inst.name}-${inst.version} error: ${e}`);
      }
    }
  });
}

export function loadCSS(path: string) {
  let href = `${path}/style.css`;
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  let head = document.getElementsByTagName("head")[0];
  head.appendChild(link);
}
/*
export function Import0(base: string, module: string, version: string) {
  let src = `${base}/${module}-${version}/${module}.js`;
  let scElem = document.createElement("script");
  scElem.type = "module";
  scElem.innerHTML = `
  import inst from "${src}"; 
  iCode.iCodeInstCache(iCode.insts,"${module}","${version}",inst);
  `;
  scElem.onload = () => {
    head.removeChild(scElem);
  };

  let head = document.getElementsByTagName("head")[0];
  head.appendChild(scElem);
}
*/

// function instCache(insts: any, module: string, version: string, inst: any) {
//   let verInsts = insts[module];
//   if (typeof verInsts === "undefined") {
//     verInsts = {};
//     verInsts[version] = inst;
//     insts[module] = verInsts;
//   } else {
//     verInsts[version] = inst;
//   }
// }
// 平铺开
function instCacheMV(insts: any, module: string, version: string, inst: any) {
  insts[`${module}-${version}`] = inst;
}

export function registeRoutes(
  router: Router,
  routes: Array<RouteConfigsTable>
) {
  const layout = icode.defaultValues["layout"];
  routes.forEach(r => {
    if (!r.component) {
      r.component = layout;
    }
  });
}
