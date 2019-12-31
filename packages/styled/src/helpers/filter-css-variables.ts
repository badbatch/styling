import { StylingProps } from "@styling/types";
import { isArray, isNumber, isString } from "lodash";
import { StylingCSSVariables } from "../types";

export default function filterCSSVariables(props: StylingProps) {
  return props.filter(
    prop => isArray(prop) && isString(prop[0]) && (isString(prop[1]) || isNumber(prop[1])),
  ) as StylingCSSVariables;
}
