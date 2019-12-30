import { PlainObject, RawStylingConfig, StylingConfig } from "@styling/types";
import { isPlainObject, isString, merge } from "lodash";
import { resolve } from "path";

export default function parseStylingConfig(config: RawStylingConfig, componentName: string): StylingConfig {
  let theme: PlainObject = {};

  if (isString(config.theme)) {
    theme = require(resolve(__dirname, config.theme));
  } else if (isPlainObject(config.theme)) {
    theme = config.theme as PlainObject;
  }

  if (isPlainObject(config.overrides?.[componentName])) {
    theme = merge(theme, config.overrides?.[componentName]);
  }

  return { theme };
}
