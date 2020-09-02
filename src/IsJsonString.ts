/**
 * 是 JSON 字符串
 * @param str
 */
export function IsJsonString(str: string): boolean {
  try {
    typeof JSON.parse(str) == "object";
    return true;
  } catch {
    return false;
  }
}
