import { NoEmpty } from "../src";

describe("NoEmpty:", () => {
  test("empty string", () => {
    expect(NoEmpty("")).toBe(false);
  });
  test("empty string more", () => {
    expect(NoEmpty("     ")).toBe(false);
  });
  test("string", () => {
    expect(NoEmpty("test")).toBe(true);
  });
  test("number 0", () => {
    expect(NoEmpty(0)).toBe(true);
  });
  test("number", () => {
    expect(NoEmpty(11)).toBe(true);
  });
  test("NaN", () => {
    expect(NoEmpty(NaN)).toBe(true);
  });
  test("undefined", () => {
    expect(NoEmpty(undefined)).toBe(false);
  });
  test("null", () => {
    expect(NoEmpty(null)).toBe(false);
  });
  test("empty array", () => {
    expect(NoEmpty([])).toBe(true);
  });
  test("no empty array", () => {
    expect(NoEmpty([11, 3])).toBe(true);
  });
});









