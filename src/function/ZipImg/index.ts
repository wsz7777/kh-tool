import { Base64ToFile } from "../../base/Base64ToFile";
import { MegaPixImage } from "./MegaPixImage";

/**
 * @description 图片压缩的最核心的步骤——压缩
 * @param image Image对象 dom
 * @param maxC 设置压缩的图片的最长边
 */
export function ZipImg(image: HTMLImageElement, maxC = 750) {
  const canvas = document.createElement("canvas");
  let Cwidth = image.width;
  let Cheight = image.height;
  let bl;

  if (Cwidth > 300 && Cheight > 300) {
    if (Cwidth > Cheight) {
      bl = Cwidth / Cheight;
      Cwidth = maxC;
      Cheight = Cwidth / bl;
    } else {
      bl = Cheight / Cwidth;
      Cheight = maxC;
      Cwidth = Cheight / bl;
    }
  }

  canvas.width = Cwidth;
  canvas.height = Cheight;

  // const context = canvas.getContext("2d");
  // context.drawImage(imageObj, 0, 0, Cwidth, Cheight);

  const mpimg = new MegaPixImage(image);
  mpimg.render(canvas, { width: Cwidth, height: Cheight });

  // const imgFile = canvas.toDataURL("image/jpeg", 0.7);
  const imgFile = canvas.toDataURL("image/png");
  // let imgFile = canvas.toDataURL("image/webp");
  return Base64ToFile(imgFile);
}
