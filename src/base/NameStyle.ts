/**
 * 命名法：
 * kebab  串式  asd-fgh
 * snake  蛇形  asd_fgh
 * Camel 驼峰命名法  AsdFgh
 * upperCamel 大驼峰命名法 同 Camel
 * lowerCamel 小驼峰命名法 asdFgh
 */

/** 下划线转换为驼峰 */
export function Kebab2Camel(s) {
  return s.replace(/_(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}

/** 驼峰转换为下划线 */
export function Camel2Kebab(s) {
  return s.replace(/([A-Z])/g, "_$1").toLowerCase();
}

/** 短横线转换为驼峰 */
export function Snake2Camel(s) {
  return s.replace(/-(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}

/** 驼峰转换为短横线 */
export function Camel2Snake(s) {
  return s.replace(/([A-Z])/g, "-$1").toLowerCase();
}
