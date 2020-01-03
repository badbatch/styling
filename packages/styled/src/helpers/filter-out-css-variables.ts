import { PropList, PropListWithoutCSSVariables } from "@styling/types";
import { isArray, isNumber, isString, isUndefined } from "lodash";

export default function filterOutCSSVariables(props: PropList) {
  return props.filter(
    prop => !(isArray(prop) && isString(prop[0]) && (isUndefined(prop[1]) || isString(prop[1]) || isNumber(prop[1]))),
  ) as PropListWithoutCSSVariables;
}
