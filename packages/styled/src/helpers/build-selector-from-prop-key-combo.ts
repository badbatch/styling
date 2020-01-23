import { buildMapKeyFromPropKeyCombo } from "@styling/helpers";
import { PropList } from "@styling/types";

export default function buildSelectorFromPropKeyCombo(
  baseSelector: string,
  propNameCombo: string[],
  propList?: PropList,
) {
  return `${baseSelector}--${buildMapKeyFromPropKeyCombo(propNameCombo, propList)}`;
}
