import { PlainObject, StylingProps } from "@styling/types";
import { isArray, isNumber, isString, isUndefined } from "lodash";

export default function getCSSVariableProps(stylingProps: StylingProps, props: PlainObject) {
  const filteredProps: PlainObject = {};

  Object.keys(props).forEach(key => {
    const stylingProp = stylingProps.find(
      p => isArray(p) && isString(p[0]) && (isUndefined(p[1]) || isString(p[1]) || isNumber(p[1])) && p[0] === key,
    );

    if (stylingProp && (isString(props[key]) || isNumber(props[key]))) {
      filteredProps[key] = props[key];
    }
  });

  return filteredProps;
}
