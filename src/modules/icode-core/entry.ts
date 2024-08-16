import { importModule } from "./core";
import { iCode } from "./icode";

export default {
  name: "icode-core",
  version: "0.1.0",
  describtion: "icode core",
  type: "tools",
  iCode: {
    ...iCode,
    importModule
  }
};
