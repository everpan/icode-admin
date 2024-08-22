import type { Pinia } from "pinia";
import type { Router } from "vue-router";

declare global {
  interface EntryInfo {
    name: string;
    version: string;
    describtion: string;
    routes?: Array<RouteConfigsTable>;
    sysRoutes?: Array<RouteConfigsTable>;
    config?: Record<string, any>;
    type: "entry" | "layout" | "framework";
    extra?: Record<string, any>;
    init?(
      _router: Router,
      _store: Pinia,
      conf: Record<string, any>
    ): Promise<any>;
  }
}
