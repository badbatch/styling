import { PlainObject, RawStylingConfig, StylingConfig } from "@styling/types";
import { isPlainObject, isString, merge } from "lodash";
import { resolve } from "path";
import { error, info } from "./log";

export default function parseStylingConfig(
  config: RawStylingConfig,
  currentDir: string,
  componentName: string,
): StylingConfig {
  let theme: PlainObject = {};

  if (isString(config.theme)) {
    info(`Loading theme from ${config.theme}`);

    try {
      theme = require(resolve(currentDir, config.theme));

      if (theme.__esModule && theme.default) {
        theme = theme.default;
      }

      info("Theme loaded successfully", theme);
    } catch (e) {
      error("Theme loading failed", e);
    }
  } else if (isPlainObject(config.theme)) {
    theme = config.theme as PlainObject;
  }

  if (isPlainObject(config.overrides?.[componentName])) {
    theme = merge(theme, config.overrides?.[componentName]);
  }

  return { ...config, theme };
}
