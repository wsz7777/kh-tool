import path from "path";
import rollupTypescript from "rollup-plugin-typescript2";
import babel from "rollup-plugin-babel";
import clear from "rollup-plugin-clear";
import { eslint } from "rollup-plugin-eslint";
import { DEFAULT_EXTENSIONS } from "@babel/core";

import pkg from "./package.json";

const paths = {
  input: path.join(__dirname, "/src/index.ts"),
  output: path.join(__dirname, "/lib"),
};
const getOutput = (name) => path.join(paths.output, name);
// rollup 配置项
const rollupConfig = {
  input: paths.input,
  output: [
    {
      file: getOutput("index.js"),
      format: "es",
      name: pkg.name,
    },
  ],
  external: ["crypto-js"],
  plugins: [
    clear({ targets: ["lib"] }),
    // 验证导入的文件
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ["src/**/*.ts"],
      exclude: ["node_modules/**", "lib/**", "*.js", "test/**"],
    }),

    rollupTypescript(),
    babel({
      runtimeHelpers: true,
      // 只转换源代码，不运行外部依赖
      exclude: "node_modules/**",
      // babel 默认不支持 ts 需要手动添加
      extensions: [...DEFAULT_EXTENSIONS, ".ts"],
    }),
  ],
};

export default rollupConfig;
