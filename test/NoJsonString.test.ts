import { IsJsonString } from "../src";

describe("IsJsonString:", () => {
  test("empty string", () => {
    expect(IsJsonString("")).toBe(false);
  });
  test("string", () => {
    expect(IsJsonString("test")).toBe(false);
  });
  test("  ", () => {
    expect(IsJsonString("  ")).toBe(false);
  });
  test("{}", () => {
    expect(IsJsonString("{}")).toBe(true);
  });
  test("[{}]", () => {
    expect(IsJsonString("[{}]")).toBe(true);
  });
  test("[{},{}]", () => {
    expect(IsJsonString("[{},{}]")).toBe(true);
  });
  test("[{},{}", () => {
    expect(IsJsonString("[{},{}")).toBe(false);
  });
  test("{s:'ddd'}", () => {
    expect(IsJsonString("{s:'ddd'}")).toBe(false);
  });
  test("undefined", () => {
    expect(IsJsonString("undefined")).toBe(false);
  });
});
