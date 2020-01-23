import { PropList } from "@styling/types";
import { isString, kebabCase } from "lodash";
import { PropKeyComboCSS, PropKeyComboCSSEntry } from "../types";

export default function orderPropKeyComboCSS(propKeyComboCSS: PropKeyComboCSS, propList?: PropList) {
  const baseSelector = (propKeyComboCSS.find(([key]) => key === "base") as PropKeyComboCSSEntry)[1].selector;
  const baseSelectorMatch = `${baseSelector}--`;

  return propKeyComboCSS.sort((entryA, entryB) => {
    const entryASelector = entryA[1].selector;
    const entryBSelector = entryB[1].selector;

    if (propList) {
      if (entryASelector.startsWith(baseSelectorMatch) && entryBSelector.startsWith(baseSelectorMatch)) {
        const entryAPropListIndex = propList?.findIndex(entry => {
          const selectorPropName = kebabCase(isString(entry) ? entry : entry[0]);
          return entryASelector.startsWith(`${baseSelectorMatch}${selectorPropName}`);
        });

        const entryBPropListIndex = propList?.findIndex(entry => {
          const selectorPropName = kebabCase(isString(entry) ? entry : entry[0]);
          return entryBSelector.startsWith(`${baseSelectorMatch}${selectorPropName}`);
        });

        if (entryAPropListIndex > entryBPropListIndex) return -1;
        if (entryAPropListIndex < entryBPropListIndex) return 1;
      }
    }

    if (entryASelector < entryBSelector) return -1;
    if (entryASelector > entryBSelector) return 1;
    return 0;
  });
}
