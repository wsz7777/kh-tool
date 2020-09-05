import { enc } from "crypto-js";
const { Base64, Utf8 } = enc;

export function StrToBase64(str: string): string {
  return Base64.stringify(Utf8.parse(str));
}

export function StrFromBase64(str: string): string {
  return Base64.parse(str).toString(Utf8);
}

/** 解析为url路径str专用 */
export function StrToUrlStr(str: string): string {
  return StrToBase64(str).replace(/\//g, "-").replace(/=/g, "_");
}

/** 从url路径str解析原意专用 */
export function StrFromUrlStr(str: string): string {
  return StrFromBase64(str.replace(/-/g, "/").replace(/_/g, "="));
}
