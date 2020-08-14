/**
 * 把文件读取成 base64 格式
 * @param file 文件对象
 */
export function FileToBase64(file: File): Promise<string | ArrayBuffer> {
  const reading = new FileReader();

  return new Promise((resolve, reject) => {
    reading.onload = (event: ProgressEvent<FileReader>) =>
      resolve(event.target.result);

    reading.onerror = () => reject(new Error("文件读取失败"));

    reading.readAsDataURL(file);
  });
}

/**
 * 把文件读取成 ArrayBuffer格式
 * @param  file 文件对象
 */
export function FileToArrayBuffer(file: File): Promise<string | ArrayBuffer> {
  const reading = new FileReader();

  return new Promise((resolve, reject) => {
    reading.onload = (event: ProgressEvent<FileReader>) =>
      resolve(event.target.result);

    reading.onerror = () => reject(new Error("文件读取失败"));

    reading.readAsArrayBuffer(file);
  });
}
