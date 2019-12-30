import { Interpolation, StringObject } from "@styling/types";
import { kebabCase } from "lodash";
import uuid from "uuid/v4";
import { SelectorCSS, StylingCSSVariablesGeneric } from "../types";
import buildCSSPropsFromStylingProps from "./build-css-props-from-styling-props";
import buildCSSStringFromCSSObjects from "./build-css-string-from-css-objects";
import buildMapKeyFromStylingProps from "./build-map-key-from-styling-props";
import buildSelectorFromStylingProps from "./build-selector-from-styling-props";
import collateCSS from "./collate-css";
import dedupeCSS from "./dedupe-css";
import loadStylingConfig from "./load-styling-config";
import writeCSS from "./write-css";

export default function buildPropsToClassNamesMap(
  componentName: string,
  propNameCombos: string[][],
  cssVariableProps: StylingCSSVariablesGeneric,
  interpolations: Interpolation[],
): StringObject {
  const { outputPath, theme } = loadStylingConfig(componentName);
  const baseSelector = `${kebabCase(componentName)}-${uuid()}`;

  const selectorCSS: SelectorCSS = {
    [baseSelector]: {
      css: collateCSS(interpolations, buildCSSPropsFromStylingProps([], cssVariableProps), theme),
      key: "",
    },
  };

  propNameCombos.forEach(combo => {
    const comboCSS = dedupeCSS(
      collateCSS(interpolations, buildCSSPropsFromStylingProps(combo, cssVariableProps), theme),
      selectorCSS[baseSelector].css,
    );

    if (comboCSS) {
      selectorCSS[buildSelectorFromStylingProps(baseSelector, combo)] = {
        css: comboCSS,
        key: buildMapKeyFromStylingProps(combo),
      };
    }
  });

  writeCSS(buildCSSStringFromCSSObjects(selectorCSS), outputPath);

  return Object.keys(selectorCSS).reduce((map: StringObject, selector) => {
    const { key } = selectorCSS[selector];
    map[key] = selector;
    return map;
  }, {});
}
