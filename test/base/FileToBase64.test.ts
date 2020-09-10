import { FileToBase64, Base64ToFile } from "../../src";

// import img from "./bedding.png";
// console.log(globalThis)
// console.log(Object.prototype.toString.call(img));
describe("FileToBase64:", () => {
  test("success", async () => {
    expect(await FileToBase64(new File([new Blob()], "xxx.png"))).toBe(
      "data:application/octet-stream;base64,"
    );
  });

  //  /*  test("fail", async () => {
  //     expect(await FileToBase64(new File([], "xxx.png"))).toBe(
  //       "文件读取失败"
  //     );
  //   }); */
});

describe("Base64ToFile:", () => {
  test("success", () => {
    expect(
      Base64ToFile("data:application/octet-stream;base64,") instanceof File
    ).toBe(true);
  });
});
