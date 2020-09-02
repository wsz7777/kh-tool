export function IdRandom(num = 10): string {
  return Math.random().toString(36).substr(2, num);
}
