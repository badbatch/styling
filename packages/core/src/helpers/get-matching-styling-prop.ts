import { StylingProps } from "@styling/types";
import { isArray, isNumber, isString } from "lodash";

export default function getMatchingStylingProp(propName: string, stylingProps: StylingProps) {
  return stylingProps.find(prop => {
    if (isArray(prop) && isString(prop[0]) && (isString(prop[1]) || isNumber(prop[1]))) {
      return false;
    }

    const name = isString(prop) ? prop : prop[0];
    return name === propName;
  });
}
