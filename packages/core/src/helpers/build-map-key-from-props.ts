import { isBoolean, isString, kebabCase } from "lodash";
import { RelevantProps } from "../types";

export default function buildMapKeyFromProps(props: RelevantProps) {
  return Object.keys(props)
    .reduce((mapKeys, propName) => {
      if (isBoolean(props[propName])) {
        mapKeys.push(kebabCase(propName));
      } else if (isString(props[propName])) {
        mapKeys.push(kebabCase(`${propName}::${props[propName]}`));
      }

      return mapKeys;
    }, [] as string[])
    .sort()
    .join("--");
}
