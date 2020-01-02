import { PropList } from "@styling/types";
import { isArray, isNumber, isString } from "lodash";

export default function getMatchingPropFromList(propName: string, propList: PropList, relevantPropKeys: string[]) {
  return propList.find(prop => {
    if (isArray(prop) && isString(prop[0]) && (isString(prop[1]) || isNumber(prop[1]))) {
      return false;
    }

    const name = isString(prop) ? prop : prop[0];
    return name === propName && relevantPropKeys.find(propKey => propKey === name || propKey.startsWith(`${name}::`));
  });
}
