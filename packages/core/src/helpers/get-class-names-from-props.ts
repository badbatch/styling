import { buildMapKeyFromPropKeyCombo, generatePropKeyCombos } from "@styling/helpers";
import { PlainObject, PropList, StringObject } from "@styling/types";
import filterRelevantPropList from "./filter-relevant-prop-list";

export default function getClassNamesFromProps(
  propList: PropList,
  relevantPropKeys: string[],
  propsToClassNamesMap: StringObject,
  props: PlainObject,
) {
  const relevantPropList = filterRelevantPropList(propList, relevantPropKeys, props);
  const propKeyCombos = generatePropKeyCombos(relevantPropList);

  return propKeyCombos.reduce((classNames, keyCombo) => {
    const mapKey = buildMapKeyFromPropKeyCombo(keyCombo, propList);
    const className = propsToClassNamesMap[mapKey];
    return className ? classNames + ` ${className}` : classNames;
  }, propsToClassNamesMap.base);
}
