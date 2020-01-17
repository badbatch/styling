import { PlainObject } from "@styling/types";

export default function sortObjectKeys(unordered: PlainObject) {
  return Object.keys(unordered)
    .sort()
    .reduce((ordered: PlainObject, key) => {
      ordered[key] = unordered[key];
      return ordered;
    }, {});
}
