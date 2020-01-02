import { buildMapKeyFromPropKeyCombo } from "@styling/helpers";
import { CSSVariablePropList, Interpolation, StylingConfig } from "@styling/types";
import { PropKeyComboCSS } from "../types";
import buildBaseSelector from "./build-base-selector";
import buildInterpolationProps from "./build-interpolation-props";
import buildSelectorFromPropKeyCombo from "./build-selector-from-prop-key-combo";
import collateCSS from "./collate-css";
import dedupeCSS from "./dedupe-css";

export default function buildCSSObjects(
  propKeyCombos: string[][],
  cssVariablePropList: CSSVariablePropList,
  interpolations: Interpolation[],
  componentName: string,
  { selectorPrefix, theme }: StylingConfig,
) {
  const baseSelector = buildBaseSelector(componentName, selectorPrefix);
  const baseCSS = collateCSS(interpolations, buildInterpolationProps([], cssVariablePropList), theme);

  const propKeyComboCSS: PropKeyComboCSS = {};

  if (Object.keys(baseCSS).length) {
    propKeyComboCSS.base = {
      css: baseCSS,
      keyCombo: [],
      selector: baseSelector,
    };
  }

  const sortedKeyCombos = propKeyCombos.sort((a, b) => {
    return a.length - b.length;
  });

  sortedKeyCombos.forEach(keyCombo => {
    const comboCSS = dedupeCSS(
      collateCSS(interpolations, buildInterpolationProps(keyCombo, cssVariablePropList), theme),
      keyCombo,
      propKeyComboCSS,
    );

    if (Object.keys(comboCSS).length) {
      propKeyComboCSS[buildMapKeyFromPropKeyCombo(keyCombo)] = {
        css: comboCSS,
        keyCombo,
        selector: buildSelectorFromPropKeyCombo(baseSelector, keyCombo),
      };
    }
  });

  return propKeyComboCSS;
}
