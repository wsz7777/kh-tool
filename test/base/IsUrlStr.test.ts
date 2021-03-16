import { IsUrlStr } from "../../src";

describe("IsJsonString:", () => {
  test("empty string", () => {
    expect(IsUrlStr("")).toBe(false);
  });
  test("string", () => {
    expect(IsUrlStr("test")).toBe(false);
  });
  test("undefined", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    expect(IsUrlStr(undefined)).toBe(false);
  });
  test("number", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    expect(IsUrlStr(21)).toBe(false);
  });
  test("http://www.baidu.com", () => {
    expect(IsUrlStr("http://www.baidu.com")).toBeInstanceOf(URL);
  });
});
