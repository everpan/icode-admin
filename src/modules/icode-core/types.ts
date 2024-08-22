export interface IICode {
  enableGlobal(): void;
  loadGlobalConfig(url: string, cb: any): Promise<any>;
  registeRoutes(routes: Array<RouteConfigsTable>): void;
  importModule(path: string, module: string, version: string, cb: any): void;
}
