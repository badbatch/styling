import { RawStylingConfig, StylingConfig } from "@styling/types";
import appRoot from "app-root-path";
import { cloneDeep, merge } from "lodash";
import { resolve } from "path";
import { PACKAGE_JSON_FILENAME, STYLING_CONFIG_FILENAME } from "../constants";
import parseStylingConfig from "./parse-styling-config";

const stylingConfigs: Map<string, StylingConfig> = new Map();

function conditionallyLoadParentStylingConfig(path: string, childConfig: StylingConfig, componentName: string) {
  if (appRoot.toString() === path) return childConfig;
  return loadStylingConfig(resolve(path, ".."), childConfig, componentName);
}

function loadStylingConfig(path: string, childConfig: StylingConfig, componentName: string): StylingConfig {
  try {
    let config;

    if (stylingConfigs.has(path)) {
      config = cloneDeep(stylingConfigs.get(path)) as StylingConfig;
    } else {
      try {
        config = parseStylingConfig(require(resolve(path, STYLING_CONFIG_FILENAME)) as RawStylingConfig, componentName);
      } catch {
        config = parseStylingConfig(
          require(resolve(path, PACKAGE_JSON_FILENAME)).styling as RawStylingConfig,
          componentName,
        );
      }

      stylingConfigs.set(path, config);
    }

    return conditionallyLoadParentStylingConfig(path, merge(config, childConfig), componentName);
  } catch {
    return conditionallyLoadParentStylingConfig(path, childConfig, componentName);
  }
}

export default function loadStylingConfigs(componentName: string): StylingConfig {
  return loadStylingConfig(__dirname, {}, componentName);
}
