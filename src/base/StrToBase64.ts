import Base64 from "crypto-js/enc-base64";
import Utf8 from "crypto-js/enc-utf8";

export const StrToBase64 = (str: string): string => Base64.stringify(Utf8.parse(str));

export const StrFromBase64 = (str: string): string =>
  Base64.parse(str).toString(Utf8);
