import { StrFromBase64, StrToBase64 } from "../../src";

describe("StrToBase64:", () => {
  test("empty string", () => {
    expect(StrToBase64("")).toBe("");
  });
});

describe("StrFromBase64:", () => {
  test("empty string", () => {
    expect(StrFromBase64("===")).toBe("");
  });
});
