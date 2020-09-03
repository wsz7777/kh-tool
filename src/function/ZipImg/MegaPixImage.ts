/**
 * Mega pixel image rendering library for iOS6 Safari
 *
 * Fixes iOS6 Safari's image file rendering issue for large size image (over mega-pixel),
 * which causes unexpected subsampling when drawing it in canvas.
 * By using this library, you can safely render the image with proper stretching.
 *
 * Copyright (c) 2012 Shinichi Tomita <shinichi.tomita@gmail.com>
 * Released under the MIT license
 */
/**
 * Detect subsampling in loaded image.
 * In iOS, larger images than 2M pixels may be subsampled in rendering.
 */

function detectSubsampling(img: HTMLImageElement): boolean {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  if (iw * ih > 1024 * 1024) {
    // subsampling may happen over megapixel image
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = canvas.height = 1;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(img, -iw + 1, 0);
    // subsampled image becomes half smaller in rendering size.
    // check alpha channel value to confirm image is covering edge pixel or not.
    // if alpha value is 0 image is not covering, hence subsampled.
    return ctx?.getImageData(0, 0, 1, 1).data[3] === 0;
  } else {
    return false;
  }
}

/**
 * Detecting vertical squash in loaded image.
 * Fixes a bug which squash image vertically while drawing into canvas for some images.
 */
function detectVerticalSquash(
  img: HTMLImageElement,
  iw: number,
  ih: number
): number {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = ih;
  const ctx = canvas.getContext("2d");
  ctx?.drawImage(img, 0, 0);
  const data = ctx?.getImageData(0, 0, 1, ih).data;
  // search image edge pixel position in case it is squashed vertically.
  let sy = 0;
  let ey = ih;
  let py = ih;
  while (py > sy) {
    const alpha = data?.[(py - 1) * 4 + 3];
    if (alpha === 0) {
      ey = py;
    } else {
      sy = py;
    }
    py = (ey + sy) >> 1;
  }
  const ratio = py / ih;
  return ratio === 0 ? 1 : ratio;
}

/**
 * Rendering image element (with resizing) and get its data URL
 */
function renderImageToDataURL(
  img: HTMLImageElement,
  options,
  doSquash
): string {
  const canvas = document.createElement("canvas");
  renderImageToCanvas(img, canvas, options, doSquash);
  return canvas.toDataURL(options.type, options.quality || 0.8);
}

/**
 * Rendering image element (with resizing) into the canvas element
 */
function renderImageToCanvas(
  img: HTMLImageElement,
  canvas: HTMLCanvasElement,
  options,
  doSquash
) {
  let iw = img.naturalWidth;
  let ih = img.naturalHeight;
  if (!(iw + ih)) return;

  const width = options.width;
  const height = options.height;
  const ctx = canvas.getContext("2d");
  ctx?.save();
  transformCoordinate(canvas, ctx, width, height, options.orientation);
  const subsampled = detectSubsampling(img);
  if (subsampled) {
    iw /= 2;
    ih /= 2;
  }
  const d = 1024; // size of tiling canvas
  let tmpCanvas: HTMLCanvasElement | null = document.createElement("canvas");
  tmpCanvas.width = tmpCanvas.height = d;
  let tmpCtx = tmpCanvas.getContext("2d");
  const vertSquashRatio = doSquash ? detectVerticalSquash(img, iw, ih) : 1;
  const dw = Math.ceil((d * width) / iw);
  const dh = Math.ceil((d * height) / ih / vertSquashRatio);
  let sy = 0;
  let dy = 0;
  while (sy < ih) {
    let sx = 0;
    let dx = 0;
    while (sx < iw) {
      tmpCtx?.clearRect(0, 0, d, d);
      tmpCtx?.drawImage(img, -sx, -sy);
      ctx?.drawImage(tmpCanvas, 0, 0, d, d, dx, dy, dw, dh);
      sx += d;
      dx += dw;
    }
    sy += d;
    dy += dh;
  }
  ctx?.restore();
  tmpCanvas = tmpCtx = null;
}

/**
 * Transform canvas coordination according to specified frame size and orientation
 * Orientation value is from EXIF tag
 */
function transformCoordinate(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D | null,
  width: number,
  height: number,
  orientation
) {
  switch (orientation) {
    case 5:
    case 6:
    case 7:
    case 8:
      canvas.width = height;
      canvas.height = width;
      break;
    default:
      canvas.width = width;
      canvas.height = height;
  }
  switch (orientation) {
    case 2:
      // horizontal flip
      ctx?.translate(width, 0);
      ctx?.scale(-1, 1);
      break;
    case 3:
      // 180 rotate left
      ctx?.translate(width, height);
      ctx?.rotate(Math.PI);
      break;
    case 4:
      // vertical flip
      ctx?.translate(0, height);
      ctx?.scale(1, -1);
      break;
    case 5:
      // vertical flip + 90 rotate right
      ctx?.rotate(0.5 * Math.PI);
      ctx?.scale(1, -1);
      break;
    case 6:
      // 90 rotate right
      ctx?.rotate(0.5 * Math.PI);
      ctx?.translate(0, -height);
      break;
    case 7:
      // horizontal flip + 90 rotate right
      ctx?.rotate(0.5 * Math.PI);
      ctx?.translate(width, -height);
      ctx?.scale(-1, 1);
      break;
    case 8:
      // 90 rotate left
      ctx?.rotate(-0.5 * Math.PI);
      ctx?.translate(-width, 0);
      break;
    default:
      break;
  }
}

const URL =
  window.URL && window.URL.createObjectURL
    ? window.URL
    : window.webkitURL && window.webkitURL.createObjectURL
    ? window.webkitURL
    : null;

/**
 * MegaPixImage class
 */
export class MegaPixImage {
  blob: Blob | null | undefined;
  imageLoadListeners: any[] | null | undefined;
  srcImage: HTMLImageElement;

  constructor(param: HTMLImageElement | Blob) {
    let srcImage: HTMLImageElement;
    if (window.Blob && param instanceof Blob) {
      if (!URL) {
        throw Error("No createObjectURL function found to create blob url");
      }
      const img = new Image();
      img.src = URL.createObjectURL(param);
      this.blob = param as Blob;
      srcImage = img;
    } else {
      srcImage = param as HTMLImageElement;
    }

    if (!srcImage.naturalWidth && !srcImage.naturalHeight) {
      srcImage.onload = srcImage.onerror = () => {
        const listeners = this.imageLoadListeners;
        if (listeners) {
          this.imageLoadListeners = null;
          for (let i = 0, len = listeners.length; i < len; i++) {
            listeners[i]();
          }
        }
      };
      this.imageLoadListeners = [];
    }
    this.srcImage = srcImage;
  }

  /**
   * Rendering megapix image into specified target element
   */
  render(target: HTMLElement, options, callback = (): any => "") {
    if (this.imageLoadListeners) {
      this.imageLoadListeners.push(() => {
        this.render(target, options, callback);
      });
      return;
    }
    options = options || {};
    const imgWidth = this.srcImage.naturalWidth;
    const imgHeight = this.srcImage.naturalHeight;
    let width = options.width;
    let height = options.height;
    const maxWidth = options.maxWidth;
    const maxHeight = options.maxHeight;

    const doSquash = !this.blob || this.blob.type === "image/jpeg";

    if (width && !height) {
      height = ((imgHeight * width) / imgWidth) << 0;
    } else if (height && !width) {
      width = ((imgWidth * height) / imgHeight) << 0;
    } else {
      width = imgWidth;
      height = imgHeight;
    }
    if (maxWidth && width > maxWidth) {
      width = maxWidth;
      height = ((imgHeight * width) / imgWidth) << 0;
    }
    if (maxHeight && height > maxHeight) {
      height = maxHeight;
      width = ((imgWidth * height) / imgHeight) << 0;
    }
    const opt = { width: width, height: height };
    for (const k in options) opt[k] = options[k];

    const tagName = target.tagName.toLowerCase();
    if (tagName === "img") {
      (target as HTMLImageElement).src = renderImageToDataURL(
        this.srcImage,
        opt,
        doSquash
      );
    } else if (tagName === "canvas") {
      renderImageToCanvas(
        this.srcImage,
        target as HTMLCanvasElement,
        opt,
        doSquash
      );
    }
    // if (typeof this.onrender === "function") {
    //   this.onrender(target);
    // }

    callback();

    if (this.blob) {
      this.blob = null;
      URL?.revokeObjectURL(this.srcImage.src);
    }
  }
}
