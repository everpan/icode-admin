# module 编译

> 模块编译相关配置

采用vite lib模式，对src/modules下的模块进行编译
执行命令：

```shell
  vite -c build/config/vite.config.ts build -- pure-layout
```

说明：
-- 为必选，其意义是非vite参数
pure-layout 为模块文件夹名称
该配置，会找到 src/modules/pure-layout/entry.ts
然后采用正则的方式，读取 version
（这里有可能entry.ts中会存在多个`version:`,导致版本错误,将version定义在最前面可以避免）
最终会在`dist/frontend/pure-layout-${version}/`下产生编译结果。

## todo

1. base 目录对资源部署的影响; 只能是绝对路径 ./ 或者 空
2. 模块style.css的加载
