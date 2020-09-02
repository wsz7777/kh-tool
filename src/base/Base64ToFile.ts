/**
 * 将base64转换为文件对象
 * @param base64 base64格式的编码
 * @param getFile 获得 File 的结果吗
 */
export function Base64ToFile(
  base64: string,
  getFile = true
): File | Blob | string {
  try {
    const [typeStr, atobStr] = base64.split(",");
    const matchRst = typeStr.match(/:(.*?);/);
    const mime = matchRst
      ? matchRst[1]
      : (() => {
          throw new Error("未捕获到结果");
        })();

    const bstr = atob(atobStr);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    const filename = `${mime.replace("/", ".")}`;

    return getFile
      ? new File([u8arr], filename, { type: mime })
      : new Blob([u8arr], { type: mime });
  } catch (error) {
    return error.toString();
  }
}
