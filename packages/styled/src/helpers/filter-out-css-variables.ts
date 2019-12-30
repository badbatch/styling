import { isArray, isNumber, isString } from "lodash";
import { StylingPropsGeneric, StylingPropsWithoutCSSVariablesGeneric } from "../types";

export default function filterOutCSSVariables(props: StylingPropsGeneric) {
  return props.filter(
    prop => !(isArray(prop) && isString(prop[0]) && (isString(prop[1]) || isNumber(prop[1]))),
  ) as StylingPropsWithoutCSSVariablesGeneric;
}
