// function
import { DiffType } from "../../src";

const d = {
  globalStyle: {
    background: "#8c090f none no-repeat",
    backgroundSize: "100%",
  },
};

describe("Base64ToFile:", () => {
  test("{} null", () => {
    expect(DiffType({}, null)).toEqual(true);
  });
  test("{}", () => {
    expect(DiffType({}, {})).toEqual(true);
  });
  test("数据与空对象", () => {
    expect(DiffType(d, {})).toEqual(false);
  });
  test("相同数据与数据", () => {
    expect(DiffType(d, d)).toEqual(true);
  });
  test("不同数据与数据", () => {
    expect(DiffType(d, { globalStyle: {} })).toEqual(false);
  });
});
