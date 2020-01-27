import { PathConfig, PlainObject, RawStylingConfig, StylingConfig } from "@styling/types";
import { isPlainObject, isString, merge } from "lodash";
import getPathFromConfig from "./get-path-from-config";
import isPathConfig from "./is-path-config";
import { error, info, verbose } from "./log";

export default function parseStylingConfig(
  config: RawStylingConfig,
  currentDir: string,
  sourceDir: string,
  componentName?: string,
  packageDir?: string,
): StylingConfig {
  const themePath =
    isString(config.theme) || isPathConfig(config.theme)
      ? getPathFromConfig(config.theme as string | PathConfig, currentDir, sourceDir, packageDir)
      : null;

  let theme: PlainObject = {};

  if (themePath) {
    info(`Loading theme from ${themePath}`);

    try {
      theme = require(themePath);

      if (theme.__esModule && theme.default) {
        theme = theme.default;
      }

      verbose("Theme loaded successfully\n", theme);
    } catch (e) {
      error("Theme loading failed", e);
    }
  } else if (isPlainObject(config.theme)) {
    theme = config.theme as PlainObject;
  }

  if (componentName && isPlainObject(config.overrides?.[componentName])) {
    theme = merge(theme, config.overrides?.[componentName]);
  }

  const outputPath = config.outputPath
    ? getPathFromConfig(config.outputPath, currentDir, sourceDir, packageDir)
    : sourceDir;

  return { ...config, outputPath, theme };
}
