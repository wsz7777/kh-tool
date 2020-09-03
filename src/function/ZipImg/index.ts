import { Base64ToFile } from "../../base/Base64ToFile";
import { MegaPixImage } from "./MegaPixImage";

/**
 * @description 图片压缩的最核心的步骤——压缩
 * @param image Image对象 dom
 * @param options.max_width 设置压缩的图片的最长边
 * @param options.quality 压缩质量
 */
export function MinImg(
  image: HTMLImageElement,
  options = { max_width: 750, quality: 0.8 }
) {
  const { max_width, quality } = options;
  const canvas = document.createElement("canvas");
  let c_width = image.width;
  let c_height = image.height;
  let bl: number;

  if (c_width > 300 && c_height > 300) {
    if (c_width > c_height) {
      bl = c_width / c_height;
      c_width = max_width;
      c_height = c_width / bl;
    } else {
      bl = c_height / c_width;
      c_height = max_width;
      c_width = c_height / bl;
    }
  }

  canvas.width = c_width;
  canvas.height = c_height;

  // const context = canvas.getContext("2d");
  // context.drawImage(imageObj, 0, 0, c_width, c_height);

  const mpimg = new MegaPixImage(image);
  mpimg.render(canvas, { width: c_width, height: c_height });

  // const imgFile = canvas.toDataURL("image/jpeg", quality);
  const imgFile = canvas.toDataURL("image/png", quality);
  // let imgFile = canvas.toDataURL("image/webp",quality);
  const getZipRstFile = Base64ToFile(imgFile);
  if (getZipRstFile instanceof File || getZipRstFile instanceof Blob) {
    return getZipRstFile;
  } else {
    throw getZipRstFile;
  }
}

/**
 * @description 压缩图片
 * @param { File } file 文件
 * @use 读取文件方法示例
```
async getFile(e) {
  const file = e.target.files[0];
  let zipFile = await getZipImg(file);
  console.log(zipFile);
}
```
*/
export function ZipImg(
  file: File,
  options = { max_width: 750, quality: 0.8 }
): Promise<File | Blob> {
  const reading = new FileReader();
  const imageObj: HTMLImageElement = new Image();

  return new Promise((resolve, reject) => {
    reading.onload = (event) => {
      const rst = event.target?.result as string;

      imageObj.src = rst;

      imageObj.onload = () => {
        const ImgFile = MinImg(imageObj, options);

        return resolve(ImgFile);
      };
    };

    reading.onerror = () => {
      reject(new Error("图片加载失败"));
    };

    reading.readAsDataURL(file);
  });
}
