import { GetType, GetTypeOf } from "../src";

describe("GetType:", () => {
  test("empty string", () => {
    expect(GetType("")).toBe("string");
  });
  test("string", () => {
    expect(GetType("test")).toBe("string");
  });
  test("number 0", () => {
    expect(GetType(0)).toBe("number");
  });
  test("number", () => {
    expect(GetType(11)).toBe("number");
  });
  test("NaN", () => {
    expect(GetType(NaN)).toBe("number");
  });
  test("undefined", () => {
    expect(GetType(undefined)).toBe("undefined");
  });
  test("null", () => {
    expect(GetType(null)).toBe("null");
  });
  test("empty arr", () => {
    expect(GetType([])).toBe("array");
  });
  test("no empty arr", () => {
    expect(GetType([11, 3])).toBe("array");
  });
});

describe("GetTypeOf:", () => {
  test("empty string", () => {
    expect(GetTypeOf("", "string")).toEqual(true);
  });
  test("string", () => {
    expect(GetTypeOf("test", "string")).toEqual(true);
  });
  test("number 0", () => {
    expect(GetTypeOf(0, "number")).toEqual(true);
  });
  test("number", () => {
    expect(GetTypeOf(11, "number")).toEqual(true);
  });
  test("NaN", () => {
    expect(GetTypeOf(NaN, "number")).toEqual(true);
  });
  test("undefined", () => {
    expect(GetTypeOf(undefined, "undefined")).toEqual(true);
  });
  test("null", () => {
    expect(GetTypeOf(null, "null")).toEqual(true);
  });
  test("empty arr", () => {
    expect(GetTypeOf([], "array")).toEqual(true);
  });
  test("no empty arr", () => {
    expect(GetTypeOf([11, 3], "array")).toEqual(true);
  });
});
