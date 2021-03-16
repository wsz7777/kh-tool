/**
 * 是 URL 字符串
 * @param str
 */
export const IsUrlStr = (url: string): URL | false => {
  try {
    return new URL(url);
  } catch (error) {
    return false;
  }
};
