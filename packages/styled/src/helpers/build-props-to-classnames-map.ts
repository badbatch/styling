import { Interpolation, StringObject } from "@styling/types";
import { existsSync, removeSync } from "fs-extra";
import { resolve } from "path";
import { STYLING_CSS_FILENAME } from "../constants";
import { Metadata, SelectorCSS, StylingCSSVariables } from "../types";
import buildBaseSelector from "./build-base-selector";
import buildCSSPropsFromStylingProps from "./build-css-props-from-styling-props";
import buildCSSStringFromCSSObjects from "./build-css-string-from-css-objects";
import buildMapKeyFromStylingProps from "./build-map-key-from-styling-props";
import buildSelectorFromStylingProps from "./build-selector-from-styling-props";
import collateCSS from "./collate-css";
import dedupeCSS from "./dedupe-css";
import loadStylingConfig from "./load-styling-config";
import { error, info } from "./log";
import writeCSS from "./write-css";

export default function buildPropsToClassNamesMap(
  propNameCombos: string[][],
  cssVariableProps: StylingCSSVariables,
  interpolations: Interpolation[],
  { componentName, sourceDir }: Metadata,
): StringObject {
  const { outputPath, selectorPrefix, theme } = loadStylingConfig({ componentName, sourceDir });
  const fullOutputPath = resolve(outputPath, STYLING_CSS_FILENAME);

  if (existsSync(fullOutputPath)) {
    removeSync(fullOutputPath);
  }

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

  info("Generating css from css objects");
  const css = buildCSSStringFromCSSObjects(selectorCSS);

  info(`Writing css to ${fullOutputPath}`, css);

  try {
    writeCSS(css, fullOutputPath);
  } catch (e) {
    error("Writing css failed", e);
  }

  return Object.keys(selectorCSS).reduce((map: StringObject, selector) => {
    const { key } = selectorCSS[selector];
    if (key) map[key] = selector;
    return map;
  }, {});
}
