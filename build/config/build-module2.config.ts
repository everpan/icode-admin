import { fileURLToPath, URL } from "node:url";
import { readFileSync } from "node:fs";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";

function fetchVersionFromEntry(file: string): string {
  let context = readFileSync(file, { encoding: "utf-8" });
  // version: "0.1.0"
  let pos = context.indexOf("version:");
  if (pos > -1) {
    let end = context.indexOf("\n", pos);
    if (end > 0) {
      let ver = context.substring(pos + 8, end);
      ver = ver.replaceAll(/[ \"\,\r]/g, "");
      return ver;
    }
  }
  return "0.0.0";
}

let args = process.argv;
console.log(args);
if (args.length < 7) {
  console.warn(`Usage: vite -c build/config/vite.config.ts build -- <module>`);
  process.exit(-1);
}
let moduleName = args[6];

let libFileName = `src/modules/${moduleName}/entry.ts`;
let moduleVersion = fetchVersionFromEntry(libFileName);
let base = `frontend/${moduleName}-${moduleVersion}`;
let dist = `dist/${base}`;
console.log("entry:" + libFileName);
console.log("dist:" + dist);
// process.argv = args.slice(0, 5);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    VueI18nPlugin({
      jitCompilation: false,
      include: [fileURLToPath(new URL("../../locales/**", import.meta.url))]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("../../src", import.meta.url))
    }
  },
  build: {
    lib: {
      entry: libFileName,
      name: moduleName,
      fileName: moduleName
    },
    outDir: dist,
    rollupOptions: {
      // 静态资源分类打包
      output: {
        chunkFileNames: "js/[name]-[hash].js"
        // entryFileNames: "static/js/[name]-[hash].js",
        // assetFileNames: "static/[ext]/[name]-[hash].[ext]"
      }
    }
  }
});
