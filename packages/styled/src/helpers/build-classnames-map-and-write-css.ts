import { error, info, loadStylingConfig } from "@styling/helpers";
import { CSSVariablePropList, Interpolation, Metadata, StringObject } from "@styling/types";
import buildCSSObjects from "./build-css-objects";
import buildCSSStringFromCSSObjects from "./build-css-string-from-css-objects";
import writeCSS from "./write-css";

export default function buildClassNamesMapAndWriteCSS(
  propKeyCombos: string[][],
  cssVariablePropList: CSSVariablePropList,
  interpolations: Interpolation[],
  { componentName, sourceFilename }: Metadata,
) {
  const config = loadStylingConfig({ componentName, sourceFilename });

  info("Building css objects");

  const propKeyComboCSS = buildCSSObjects(
    propKeyCombos,
    cssVariablePropList,
    interpolations,
    { componentName, sourceFilename },
    config,
  );

  const { outputPath } = config;

  info("Generating css from css objects");
  const css = buildCSSStringFromCSSObjects(propKeyComboCSS);

  info(`Writing css to ${outputPath}\n`, css);

  try {
    writeCSS(css, outputPath, sourceFilename);
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
