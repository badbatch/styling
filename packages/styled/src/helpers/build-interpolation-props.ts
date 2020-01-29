import { CSSVariablePropList, PlainObject } from "@styling/types";
import { kebabCase } from "lodash";

export default function buildInterpolationProps(propKeyCombo: string[], cssVariablePropList: CSSVariablePropList) {
  const props: PlainObject = {};

  /**
   * TODO: Need to implement some sort of fallback
   * for ie11 support, maybe using new config option
   * or babel options to detect ie11 support and if
   * required hardcode the fallback value.
   */

  cssVariablePropList.forEach(([key, value]) => {
    props[key] = `var(--${kebabCase(key)}${value ? `, ${value}` : ""})`;
  });

  propKeyCombo.forEach(prop => {
    const split = prop.split("::");

    if (split.length === 2) {
      props[split[0]] = split[1];
    } else {
      props[split[0]] = true;
    }
  });

  return props;
}
