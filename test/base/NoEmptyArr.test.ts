import { NoEmptyArr } from "../../src";

describe("NoEmptyArr:", () => {
  test("empty string", () => {
    expect(NoEmptyArr("")).toBe(false);
  });
  test("string", () => {
    expect(NoEmptyArr("test")).toBe(false);
  });
  test("number 0", () => {
    expect(NoEmptyArr(0)).toBe(false);
  });
  test("number", () => {
    expect(NoEmptyArr(11)).toBe(false);
  });
  test("NaN", () => {
    expect(NoEmptyArr(NaN)).toBe(false);
  });
  test("undefined", () => {
    expect(NoEmptyArr(undefined)).toBe(false);
  });
  test("null", () => {
    expect(NoEmptyArr(null)).toBe(false);
  });
  test("empty arr", () => {
    expect(NoEmptyArr([])).toBe(false);
  });
  test("no empty arr", () => {
    expect(NoEmptyArr([11, 3])).toBe(true);
  });
});









