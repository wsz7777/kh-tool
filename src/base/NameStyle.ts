/**
 * 命名法：
 * kebab  串式  asd-fgh
 * snake  蛇形  asd_fgh
 * Camel 驼峰命名法  AsdFgh
 * upperCamel 大驼峰命名法 同 Camel
 * lowerCamel 小驼峰命名法 asdFgh
 */

/** 短横线转换为驼峰（大驼峰） */
export function Kebab2Camel(s: string): string {
  return s.replace(/(^|-)(\w)/g, (all: string, $1: string, $2: string) =>
    $2.toUpperCase()
  );
}

/** 短横线转换为小驼峰 */
export function Kebab2lowerCamel(s: string): string {
  return s.replace(/-(\w)/g, (all: string, $1: string) => $1.toUpperCase());
}

/** 下划线转换为驼峰 */
export function Snake2Camel(s: string): string {
  return s.replace(/(^|_)(\w)/g, (all: string, $1: string, $2: string) =>
    $2.toUpperCase()
  );
}

/** 下划线转换为小驼峰 */
export function Snake2lowerCamel(s: string): string {
  return s.replace(/_(\w)/g, (all: string, $1: string) => $1.toUpperCase());
}

/** 驼峰转换为短横线 */
export function Camel2Kebab(s: string): string {
  return s.replace(/\w([A-Z])/g, "-$1").toLowerCase();
}

/** 驼峰转换为下划线 */
export function Camel2Snake(s: string): string {
  return s.replace(/\w([A-Z])/g, "_$1").toLowerCase();
}
