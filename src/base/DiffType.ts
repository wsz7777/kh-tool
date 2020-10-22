// function
import { GetTypeOf } from "./GetType";

let k = 0;
/**
 * diff Object 的格式
 */
export function DiffType(one: any, other: any): boolean {
  console.log(k++, one, other);
  if (GetTypeOf(one, "object") && GetTypeOf(other, "object")) {
    for (const i in one) {
      if (!one[i] || !other[i]) {
        return false;
      }
      if (GetTypeOf(one[i], "object") && GetTypeOf(other[i], "object")) {
        if (!DiffType(one[i], other[i])) {
          return false;
        }
      }
    }
  }

  return true;
}
