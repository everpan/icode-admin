import type { Router } from "vue-router";
export interface IICode {
  enableGlobal(): void;
  loadGlobalConfig(url: string, cb: any): Promise<void>;
  registeRoutes(router: Router, routes: Array<RouteConfigsTable>): void;
  importModule(path: string, module: string, version: string, cb: any): void;
}
