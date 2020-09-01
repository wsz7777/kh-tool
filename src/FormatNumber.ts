/**
 * 主要用于格式化数字
 * eg： 1234567 => 1,234,567
 */
export function FormatNumber(str: string): string {
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 将数字每3位之间用逗号分割，例如12345.22格式化为 12,345.22
 * @param {String} s 要格式化的数值
 * @param {Number} n 保留小数的位数
 */
export function FormatNumber2Decimal(s: string, n = 2): string {
  const decimal = n > 0 && n <= 20 ? n : 2;
  const [front, back = ""] = s.split(".");
  return [
    FormatNumber(front),
    back.substr(0, decimal).padEnd(decimal, "0"),
  ].join(".");
}
