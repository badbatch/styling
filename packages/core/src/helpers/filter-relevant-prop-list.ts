import { PlainObject, PropList } from "@styling/types";
import { isArray, isBoolean, isString } from "lodash";
import getMatchingPropFromList from "./get-matching-prop-from-list";

export default function filterRelevantPropList(propList: PropList, relevantPropKeys: string[], props: PlainObject) {
  const filteredPropList: Array<string | [string, string[]]> = [];

  Object.keys(props).forEach(key => {
    const matchingProp = getMatchingPropFromList(key, propList, relevantPropKeys);

    if (matchingProp) {
      switch (true) {
        case isBoolean(props[key]) && !!props[key] && isString(matchingProp):
          filteredPropList.push(matchingProp as string);
          break;
        case isString(props[key]) &&
          isArray(matchingProp) &&
          isArray(matchingProp[1]) &&
          matchingProp[1].includes(props[key]):
          filteredPropList.push([matchingProp[0], [props[key]]]);
          break;
        // no default
      }
    }
  });

  return filteredPropList;
}
