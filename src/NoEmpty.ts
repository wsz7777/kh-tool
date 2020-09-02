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

  if (typeof value === "string") {
    value = value.replace(/\s/g, "");
    if (value == "") {
      return false;
    }
  }

  return true;
}
