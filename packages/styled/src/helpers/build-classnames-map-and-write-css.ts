import { error, getFullOutputPath, info, loadStylingConfig, verbose } from "@styling/helpers";
import { CSSVariablePropList, Interpolation, Metadata, StringObject } from "@styling/types";
import { existsSync, readFileSync } from "fs-extra";
import { CSS_FILE_EXT } from "../constants";
import buildCSSObjects from "./build-css-objects";
import buildCSSStringFromCSSObjects from "./build-css-string-from-css-objects";
import mergeNewCSSIntoExisting from "./merge-new-css-into-existing";
import writeCSS from "./write-css";

export default function buildClassNamesMapAndWriteCSS(
  propKeyCombos: string[][],
  cssVariablePropList: CSSVariablePropList,
  interpolations: Interpolation[],
  { componentName, propList, sourceFilename }: Metadata,
) {
  const config = loadStylingConfig({ componentName, sourceFilename });

  info("Building css objects");

  const propKeyComboCSS = buildCSSObjects(
    propKeyCombos,
    cssVariablePropList,
    interpolations,
    { componentName, propList, sourceFilename },
    config,
  );

  const { cssOutputPath } = config;

  info("Generating css from css objects");
  let css = buildCSSStringFromCSSObjects(propKeyComboCSS);
  const fullOutputPath = getFullOutputPath(cssOutputPath, sourceFilename, { exclude: "src", extension: CSS_FILE_EXT });

  if (existsSync(fullOutputPath)) {
    info("Merging new css into existing css");
    css = mergeNewCSSIntoExisting(css, readFileSync(fullOutputPath, { encoding: "utf8" }));
  }

  verbose(`Writing css to ${cssOutputPath}\n`, css);

  try {
    writeCSS(sourceFilename, fullOutputPath, css);
  } catch (e) {
    error("Writing css failed", e);
  }

  return {
    propsToClassNamesMap: propKeyComboCSS.reduce((map: StringObject, [key, { selector }]) => {
      map[key] = selector;
      return map;
    }, {}),
    relevantPropKeys: propKeyComboCSS.reduce((set, [key, { keyCombo }]) => {
      return [...new Set([...set, ...keyCombo])];
    }, [] as string[]),
  };
}
