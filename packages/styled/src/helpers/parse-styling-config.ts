import { PlainObject, RawStylingConfig, StylingConfig } from "@styling/types";
import { isPlainObject, isString, merge } from "lodash";
import { resolve } from "path";
import { info } from "./log";

export default function parseStylingConfig(config: RawStylingConfig, componentName: string): StylingConfig {
  let theme: PlainObject = {};

  if (isString(config.theme)) {
    info(`Loading theme from ${config.theme}`);
    theme = require(resolve(__dirname, config.theme));

    if (theme.__esModule && theme.default) {
      theme = theme.default;
    }
  } else if (isPlainObject(config.theme)) {
    theme = config.theme as PlainObject;
  }

  if (isPlainObject(config.overrides?.[componentName])) {
    theme = merge(theme, config.overrides?.[componentName]);
  }

  return { theme };
}
