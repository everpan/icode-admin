import { getPluginsListWithoutFake } from "../plugins";
import { include, exclude } from "../optimize";
import { type UserConfigExport, type ConfigEnv, loadEnv } from "vite";
import { root, alias, wrapperEnv, __APP_INFO__ } from "../utils";
import { readFileSync } from "node:fs";

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

export default ({ mode }: ConfigEnv): UserConfigExport => {
  let args = process.argv;
  console.log(args);
  if (args.length < 7) {
    console.warn(
      `Usage: vite -c build/config/vite.config.ts build -- <module>`
    );
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

  const { VITE_CDN, VITE_COMPRESSION } = wrapperEnv(loadEnv(mode, root));

  return {
    // base: VITE_PUBLIC_PATH + "./",
    base,
    // root,
    resolve: {
      alias
    },
    plugins: getPluginsListWithoutFake(VITE_CDN, VITE_COMPRESSION),
    // https://cn.vitejs.dev/config/dep-optimization-options.html#dep-optimization-options
    optimizeDeps: {
      include,
      exclude
    },
    build: {
      // https://cn.vitejs.dev/guide/build.html#browser-compatibility
      target: "es2015",
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
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
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
      "process.env.NODE_ENV": JSON.stringify("production")
    }
  };
};
