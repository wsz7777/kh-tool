/**
 * 不是空数组
 */
export function NoEmptyArr(param: any): boolean {
  return !!param && param instanceof Array && param.length !== 0;
}
