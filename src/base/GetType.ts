export function GetType(val: any): string {
  return Object.prototype.toString
    .call(val)
    .toLowerCase()
    .replace(/\[object\s|]/g, "");
}

export function GetTypeOf(val: any, type: string): boolean {
  return GetType(val) === type;
}
