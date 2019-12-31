import { PlainObject } from "@styling/types";
import { kebabCase } from "lodash";
import { StylingCSSVariables } from "../types";

export default function buildCSSPropsFromStylingProps(combo: string[], cssVariableProps: StylingCSSVariables) {
  const props: PlainObject = {};

  cssVariableProps.forEach(([key, value]) => {
    props[key] = `var(--${kebabCase(key)}${value ? `, ${value}` : ""})`;
  });

  combo.forEach(prop => {
    const split = prop.split("::");

    if (split.length === 2) {
      props[split[0]] = split[1];
    } else {
      props[split[0]] = true;
    }
  });

  return props;
}
