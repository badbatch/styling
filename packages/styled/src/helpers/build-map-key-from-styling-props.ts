import { kebabCase } from "lodash";

export default function buildMapKeyFromStylingProps(propNameCombo: string[]) {
  return propNameCombo
    .map(propName => kebabCase(propName))
    .sort()
    .join("--");
}
