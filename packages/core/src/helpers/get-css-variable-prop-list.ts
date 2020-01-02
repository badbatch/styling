import { PlainObject, PropList } from "@styling/types";
import { isArray, isNumber, isString, isUndefined } from "lodash";

export default function getCSSVariablePropList(propList: PropList, props: PlainObject) {
  const cssVariablePropList: PlainObject = {};

  Object.keys(props).forEach(key => {
    const matchingProp = propList.find(
      p => isArray(p) && isString(p[0]) && (isUndefined(p[1]) || isString(p[1]) || isNumber(p[1])) && p[0] === key,
    );

    if (matchingProp && (isString(props[key]) || isNumber(props[key]))) {
      cssVariablePropList[key] = props[key];
    }
  });

  return cssVariablePropList;
}
