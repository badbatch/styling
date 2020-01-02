import { Interpolation, StringObject } from "@styling/types";
import { Metadata, SelectorCSS, StylingCSSVariables } from "../types";
import buildBaseSelector from "./build-base-selector";
import buildCSSPropsFromStylingProps from "./build-css-props-from-styling-props";
import buildCSSStringFromCSSObjects from "./build-css-string-from-css-objects";
import buildMapKeyFromStylingProps from "./build-map-key-from-styling-props";
import buildSelectorFromStylingProps from "./build-selector-from-styling-props";
import collateCSS from "./collate-css";
import dedupeCSS from "./dedupe-css";
import loadStylingConfig from "./load-styling-config";
import writeCSS from "./write-css";

export default function buildPropsToClassNamesMap(
  propNameCombos: string[][],
  cssVariableProps: StylingCSSVariables,
  interpolations: Interpolation[],
  { componentName, sourceDir }: Metadata,
): StringObject {
  const { outputPath, selectorPrefix, theme } = loadStylingConfig({ componentName, sourceDir });
  const baseSelector = buildBaseSelector(componentName, selectorPrefix);
  const baseCSS = collateCSS(interpolations, buildCSSPropsFromStylingProps([], cssVariableProps), theme);

  const selectorCSS: SelectorCSS = {};

  if (Object.keys(baseCSS).length) {
    selectorCSS[baseSelector] = {
      css: baseCSS,
      key: "",
    };
  }

  propNameCombos.forEach(combo => {
    const comboCSS = dedupeCSS(
      collateCSS(interpolations, buildCSSPropsFromStylingProps(combo, cssVariableProps), theme),
      selectorCSS[baseSelector]?.css,
    );

    if (Object.keys(comboCSS).length) {
      selectorCSS[buildSelectorFromStylingProps(baseSelector, combo)] = {
        css: comboCSS,
        key: buildMapKeyFromStylingProps(combo),
      };
    }
  });

  writeCSS(buildCSSStringFromCSSObjects(selectorCSS), outputPath);

  return Object.keys(selectorCSS).reduce((map: StringObject, selector) => {
    const { key } = selectorCSS[selector];
    if (key) map[key] = selector;
    return map;
  }, {});
}
