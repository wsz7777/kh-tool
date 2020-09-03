import { enc } from "crypto-js";
const { Base64, Utf8 } = enc;

export const StrToBase64 = (str: string): string =>
  Base64.stringify(Utf8.parse(str));

export const StrFromBase64 = (str: string): string =>
  Base64.parse(str).toString(Utf8);
