import { CSSVariablePropList, PlainObject } from "@styling/types";
import { kebabCase } from "lodash";

export default function buildInterpolationProps(propKeyCombo: string[], cssVariablePropList: CSSVariablePropList) {
  const props: PlainObject = {};

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
