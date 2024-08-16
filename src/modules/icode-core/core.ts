import { iCode } from "./icode";

export function Import(base: string, module: string, version: string) {
  let src = `${base}/${module}-${version}/${module}.js`;
  import(src).then(inst => {
    instCache(iCode.insts, module, version, inst.default);
  });
}

export function loadCSS(base: string, module: string, version: string) {
  let href = `${base}/${module}-${version}/style.css`;
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  let head = document.getElementsByTagName("head")[0];
  head.appendChild(link);
}

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

export function instCache(
  insts: any,
  module: string,
  version: string,
  inst: any
) {
  let verInsts = insts[module];
  if (typeof verInsts === "undefined") {
    verInsts = {};
    verInsts[version] = inst;
    insts[module] = verInsts;
  } else {
    verInsts[version] = inst;
  }
}
