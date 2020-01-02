import { error, info } from "@styling/helpers";
import { CSSVariablePropList, Interpolation, StringObject } from "@styling/types";
import { Metadata } from "../types";
import buildCSSObjects from "./build-css-objects";
import buildCSSStringFromCSSObjects from "./build-css-string-from-css-objects";
import loadStylingConfig from "./load-styling-config";
import writeCSS from "./write-css";

export default function buildClassNamesMapAndWriteCSS(
  propKeyCombos: string[][],
  cssVariablePropList: CSSVariablePropList,
  interpolations: Interpolation[],
  { componentName, sourceDir }: Metadata,
) {
  const config = loadStylingConfig({ componentName, sourceDir });

  info("Building css objects");
  const propKeyComboCSS = buildCSSObjects(propKeyCombos, cssVariablePropList, interpolations, componentName, config);
  const { outputPath } = config;

  info("Generating css from css objects");
  const css = buildCSSStringFromCSSObjects(propKeyComboCSS);

  info(`Writing css to ${outputPath}`, css);

  try {
    writeCSS(css, outputPath);
  } catch (e) {
    error("Writing css failed", e);
  }

  return {
    propsToClassNamesMap: Object.keys(propKeyComboCSS).reduce((map: StringObject, key) => {
      const { selector } = propKeyComboCSS[key];
      map[key] = selector;
      return map;
    }, {}),
    relevantPropKeys: Object.keys(propKeyComboCSS).reduce((set, key) => {
      const { keyCombo } = propKeyComboCSS[key];
      return [...new Set([...set, ...keyCombo])];
    }, [] as string[]),
  };
}
