/**
 * 不为空值
 */
export function NoEmpty(value: any): boolean {
  if (
    value === null ||
    value === "" ||
    value === "undefined" ||
    value === undefined ||
    value === "null"
  ) {
    return false;
  }

  if (
    Object.prototype.toString.call(value).toLowerCase() === "[object string]"
  ) {
    value = value.replace(/\s/g, "");
    if (value == "") {
      return false;
    }
  }

  return true;
}
