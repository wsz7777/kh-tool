import {
  StrFromBase64,
  StrToBase64,
  StrToUrlStr,
  StrFromUrlStr,
} from "../../src";

describe("StrToBase64:", () => {
  test("empty string", () => {
    expect(/\d|\w|\/|(={0,2}$)/g.test(StrToBase64(""))).toBe(true);
  });
  test("djsnkdvm,vcxzkvl", () => {
    expect(/\d|\w|\/|(={0,2}$)/g.test(StrToBase64("djsnkdvm,vcxzkvl"))).toBe(
      true
    );
  });
  test("·1234567890-=qwertyuiop电竞少女库、，。、？", () => {
    expect(
      /\d|\w|\/|(={0,2}$)/g.test(
        StrToBase64("·1234567890-=qwertyuiop电竞少女库、，。、？")
      )
    ).toBe(true);
  });
});

describe("StrFromBase64:", () => {
  test("empty string", () => {
    expect(StrFromBase64("==")).toBe("");
  });
});

describe("StrToUrlStr:", () => {
  test("StrToUrlStr", () => {
    expect(/[^\d|\w|-|_|+]/g.test(StrToUrlStr("fsdfds"))).toBe(false);
  });
});

describe("StrToUrlStr", () => {
  test("a2wxOS8yM3doJGtsMTkvMjN3aA__", () => {
    expect(StrFromUrlStr("a2wxOS8yM3doJGtsMTkvMjN3aA__")).toBe('kl19/23wh$kl19/23wh');
  });
});
