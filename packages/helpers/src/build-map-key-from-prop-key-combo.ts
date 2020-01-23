import { PropList } from "@styling/types";
import { isString, kebabCase } from "lodash";

export default function buildMapKeyFromPropKeyCombo(propKeyCombo: string[], propList?: PropList) {
  const sorted = propKeyCombo.sort((entryA, entryB) => {
    if (propList) {
      const entryAPropListIndex = propList?.findIndex(entry => entryA.startsWith(isString(entry) ? entry : entry[0]));
      const entryBPropListIndex = propList?.findIndex(entry => entryB.startsWith(isString(entry) ? entry : entry[0]));
      if (entryAPropListIndex < entryBPropListIndex) return -1;
      if (entryAPropListIndex > entryBPropListIndex) return 1;
    }

    if (entryA < entryB) return -1;
    if (entryA > entryB) return 1;
    return 0;
  });

  return sorted.map(propName => kebabCase(propName)).join("--");
}
