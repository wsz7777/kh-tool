import { FormatNumber, FormatNumber2Decimal } from "../src";

describe("FormatNumber:", () => {
  test("less", () => {
    expect(FormatNumber("12")).toEqual("12");
  });

  test("normal", () => {
    expect(FormatNumber("1234567890")).toEqual("1,234,567,890");
  });
});

describe("FormatNumber2Decimal:", () => {
  test("less", () => {
    expect(FormatNumber2Decimal("12")).toEqual("12.00");
  });

  test("normal", () => {
    expect(FormatNumber2Decimal("1234567890")).toEqual("1,234,567,890.00");
  });

  test("12.2121", () => {
    expect(FormatNumber2Decimal("12.2121")).toEqual("12.21");
  });

  test("1234567890.222", () => {
    expect(FormatNumber2Decimal("1234567890.222")).toEqual("1,234,567,890.22");
  });

  test("1234567890.222  , 3", () => {
    expect(FormatNumber2Decimal("1234567890.222", 3)).toEqual(
      "1,234,567,890.222"
    );
  });
  test("1234567890.222  , 0", () => {
    expect(FormatNumber2Decimal("1234567890.222", 0)).toEqual(
      "1,234,567,890.22"
    );
  });
  test("1234567890.222  , 22", () => {
    expect(FormatNumber2Decimal("1234567890.222", 22)).toEqual(
      "1,234,567,890.22"
    );
  });
});
