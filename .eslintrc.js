module.exports = {
  // extends: ["plugin:import/errors"],
  // plugins: ["import"],
  // parser: "@typescript-eslint/parser", // 使用 ts 解析器
  extends: [
    "eslint:recommended", // eslint 推荐规则
    "plugin:@typescript-eslint/recommended", // ts 推荐规则
    "plugin:jest/recommended",
  ],
  plugins: ["@typescript-eslint", "jest"],
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      impliedStrict: true,
      objectLiteralDuplicateProperties: false,
    },
  },
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": 0,
  },
};
