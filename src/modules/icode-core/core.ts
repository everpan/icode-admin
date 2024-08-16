import { iCode } from "./icode";

export function importModule(
  base: string,
  opt: { name: string; version: string; style: boolean | string | null }
) {
  let path = genModulePath(base, opt.name, opt.version);
  Import(path, opt.name, opt.version);
  if (opt.style) {
    loadCSS(path);
  }
}

function genModulePath(base: string, module: string, version: string): string {
  return `${base}/${module}-${version}`;
}

function Import(path: string, module: string, version: string) {
  let src = `${path}/${module}.js`;
  import(src).then(inst => {
    instCache(iCode.insts, module, version, inst.default);
  });
}

function loadCSS(path: string) {
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

function instCache(insts: any, module: string, version: string, inst: any) {
  let verInsts = insts[module];
  if (typeof verInsts === "undefined") {
    verInsts = {};
    verInsts[version] = inst;
    insts[module] = verInsts;
  } else {
    verInsts[version] = inst;
  }
}
