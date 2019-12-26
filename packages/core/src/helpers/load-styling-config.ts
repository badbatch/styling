import { RawStylingConfig, StylingConfig } from "@styling/types";
import appRoot from "app-root-path";
import { cloneDeep, merge } from "lodash";
import { resolve } from "path";
import { PACKAGE_JSON_FILENAME, STYLING_CONFIG_FILENAME } from "../constants";
import parseStylingConfig from "./parse-styling-config";

const stylingConfigs: Map<string, StylingConfig> = new Map();

function conditionallyLoadParentStylingConfig(path: string, childConfig: StylingConfig) {
  if (appRoot.toString() === path) return childConfig;
  return loadStylingConfigs(resolve(path, ".."), childConfig);
}

export default function loadStylingConfigs(path: string = __dirname, childConfig: StylingConfig = {}): StylingConfig {
  try {
    let config;

    if (stylingConfigs.has(path)) {
      config = cloneDeep(stylingConfigs.get(path)) as StylingConfig;
    } else {
      try {
        config = parseStylingConfig(require(resolve(path, STYLING_CONFIG_FILENAME)) as RawStylingConfig);
      } catch {
        config = parseStylingConfig(require(resolve(path, PACKAGE_JSON_FILENAME)).styling as RawStylingConfig);
      }

      stylingConfigs.set(path, config);
    }

    return conditionallyLoadParentStylingConfig(path, merge(config, childConfig));
  } catch {
    return conditionallyLoadParentStylingConfig(path, childConfig);
  }
}
