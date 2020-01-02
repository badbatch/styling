import { kebabCase } from "lodash";

export default function buildMapKeyFromPropKeyCombo(propKeyCombo: string[]) {
  return propKeyCombo
    .map(propName => kebabCase(propName))
    .sort()
    .join("--");
}
