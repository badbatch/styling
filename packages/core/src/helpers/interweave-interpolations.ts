import { Interpolation } from "@styling/types";

export default function interweaveInterpolations(
  strings: TemplateStringsArray,
  values: Interpolation[],
): Interpolation[] {
  return values.reduce(
    (interwoven: Interpolation[], value, index) => {
      interwoven.push(value, strings[index + 1]);
      return interwoven;
    },
    [strings[0]],
  );
}
