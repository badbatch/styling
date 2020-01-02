import { CSSVariablePropList, PropList } from "@styling/types";
import { isArray, isNumber, isString } from "lodash";

export default function filterCSSVariables(props: PropList) {
  return props.filter(
    prop => isArray(prop) && isString(prop[0]) && (isString(prop[1]) || isNumber(prop[1])),
  ) as CSSVariablePropList;
}
