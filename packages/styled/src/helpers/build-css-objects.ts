import { buildMapKeyFromPropKeyCombo } from "@styling/helpers";
import { CSSVariablePropList, Interpolation, Metadata, StylingConfig } from "@styling/types";
import { PropKeyComboCSS } from "../types";
import buildBaseSelector from "./build-base-selector";
import buildInterpolationProps from "./build-interpolation-props";
import buildSelectorFromPropKeyCombo from "./build-selector-from-prop-key-combo";
import collateCSS from "./collate-css";
import dedupeCSS from "./dedupe-css";
import orderPropKeyComboCSS from "./order-prop-key-combo-css";

export default function buildCSSObjects(
  propKeyCombos: string[][],
  cssVariablePropList: CSSVariablePropList,
  interpolations: Interpolation[],
  { componentName, propList, sourceFilename }: Metadata,
  { selectorPrefix, theme }: StylingConfig,
) {
  const baseSelector = buildBaseSelector(sourceFilename, componentName, selectorPrefix);
  const baseCSS = collateCSS(interpolations, buildInterpolationProps([], cssVariablePropList), theme);

  const propKeyComboCSS: PropKeyComboCSS = [];

  propKeyComboCSS.push([
    "base",
    {
      css: baseCSS,
      keyCombo: [],
      selector: baseSelector,
    },
  ]);

  const sortedKeyCombos = propKeyCombos.sort((a, b) => {
    return a.length - b.length;
  });

  sortedKeyCombos.forEach(keyCombo => {
    const comboCSS = dedupeCSS(
      collateCSS(interpolations, buildInterpolationProps(keyCombo, cssVariablePropList), theme),
      keyCombo,
      propKeyComboCSS,
      propList,
    );

    if (Object.keys(comboCSS).length) {
      propKeyComboCSS.push([
        buildMapKeyFromPropKeyCombo(keyCombo, propList),
        {
          css: comboCSS,
          keyCombo,
          selector: buildSelectorFromPropKeyCombo(baseSelector, keyCombo, propList),
        },
      ]);
    }
  });

  return orderPropKeyComboCSS(propKeyComboCSS, propList);
}
