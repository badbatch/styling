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

  /**
   * TODO: Need to stop overriding root directives with
   * selectors nested inside them like @media directive.
   *
   * TODO: Need to get keyframe animations working.
   */

  const propKeyComboCSS = buildCSSObjects(
    propKeyCombos,
    cssVariablePropList,
    interpolations,
    { componentName, propList, sourceFilename },
    config,
  );

  const { outputPath } = config;

  info("Generating css from css objects");
  let css = buildCSSStringFromCSSObjects(propKeyComboCSS);
  const fullOutputPath = getFullOutputPath(outputPath, sourceFilename, CSS_FILE_EXT, "src");

  if (existsSync(fullOutputPath)) {
    info("Merging new css into existing css");
    css = mergeNewCSSIntoExisting(css, readFileSync(fullOutputPath, { encoding: "utf8" }));
  }

  verbose(`Writing css to ${outputPath}\n`, css);

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
