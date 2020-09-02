/**
 * 把文件读取成 ArrayBuffer格式
 * @param  file 文件对象
 */
export function FileToArrayBuffer(
  file: File
): Promise<string | ArrayBuffer | null> {
  const reading = new FileReader();

  return new Promise((resolve, reject) => {
    reading.onload = (event: ProgressEvent<FileReader>) =>
      resolve(event?.target?.result || null);

    reading.onerror = () => reject(new Error("文件读取失败"));

    reading.readAsArrayBuffer(file);
  });
}
