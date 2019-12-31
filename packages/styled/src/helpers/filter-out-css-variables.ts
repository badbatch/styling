import { StylingProps } from "@styling/types";
import { isArray, isNumber, isString } from "lodash";
import { StylingPropsWithoutCSSVariables } from "../types";

export default function filterOutCSSVariables(props: StylingProps) {
  return props.filter(
    prop => !(isArray(prop) && isString(prop[0]) && (isString(prop[1]) || isNumber(prop[1]))),
  ) as StylingPropsWithoutCSSVariables;
}
