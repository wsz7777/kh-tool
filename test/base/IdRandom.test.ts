import { IdRandom } from "../../src";

describe("NoEmptyArr:", () => {
  test("10000", () => {
    const arr = Array(10000)
      .fill(0)
      .map(() => IdRandom());
    const set = [...new Set(arr)];
    console.log("arr.length === set.length", arr.length === set.length);
    expect(arr.length === set.length).toBe(true);
  });

  // test("1000000", () => {
  //   const arr = Array(1000000)
  //     .fill(0)
  //     .map(() => IdRandom());
  //   const set = [...new Set(arr)];
  //   console.log("arr.length === set.length", arr.length === set.length);
  //   expect(arr.length === set.length).toBe(true);
  // });
  
  // test("10000000", () => {
  //   const arr = Array(10000000)
  //     .fill(0)
  //     .map(() => IdRandom());
  //   const set = [...new Set(arr)];
  //   console.log("arr.length === set.length", arr.length === set.length);
  //   expect(arr.length === set.length).toBe(true);
  // });
});
