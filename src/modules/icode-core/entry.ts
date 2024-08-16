import { Import, loadCSS, instCache } from "./core";
import { iCode } from "./icode";

export default {
  name: "icode-core",
  version: "0.1.0",
  describtion: "icode core",
  type: "tools",
  iCode: {
    ...iCode,
    import: Import,
    loadCSS,
    instCache
  }
};
