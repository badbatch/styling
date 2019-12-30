import buildMapKeyFromStylingProps from "./build-map-key-from-styling-props";

export default function buildSelectorFromStylingProps(baseSelector: string, propNameCombo: string[]) {
  return `${baseSelector}--${buildMapKeyFromStylingProps(propNameCombo)}`;
}
