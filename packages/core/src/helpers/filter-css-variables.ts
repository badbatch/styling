import { isArray, isNumber, isString } from "lodash";
import { StylingCSSVariablesGeneric, StylingPropsGeneric } from "../types";

export default function filterCSSVariables(props: StylingPropsGeneric) {
  return props.filter(
    prop => isArray(prop) && isString(prop[0]) && (isString(prop[1]) || isNumber(prop[1])),
  ) as StylingCSSVariablesGeneric;
}
