import { buildMapKeyFromPropKeyCombo } from "@styling/helpers";

export default function buildSelectorFromPropKeyCombo(baseSelector: string, propNameCombo: string[]) {
  return `${baseSelector}--${buildMapKeyFromPropKeyCombo(propNameCombo)}`;
}
