import { RawStylingConfig, StylingConfig } from "@styling/types";
import appRoot from "app-root-path";
import { cloneDeep, mergeWith } from "lodash";
import { resolve } from "path";
import { PACKAGE_JSON_FILENAME, STYLING_CONFIG_FILENAME } from "../constants";
import { Metadata } from "../types";
import { info } from "./log";
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
        info(`Loading styling config from directory ${path}`);
        config = parseStylingConfig(
          require(resolve(path, STYLING_CONFIG_FILENAME)) as RawStylingConfig,
          path,
          componentName,
        );
      } catch {
        info(`No styling config found, falling back to package.json`);

        config = parseStylingConfig(
          require(resolve(path, PACKAGE_JSON_FILENAME)).styling as RawStylingConfig,
          path,
          componentName,
        );
      }

      stylingConfigs.set(path, config);
    }

    return conditionallyLoadParentStylingConfig(
      path,
      mergeWith(config, childConfig, (value, srcValue) => {
        if (!srcValue) return value;
      }),
      componentName,
    );
  } catch {
    info(`No styling config found in package.json, checking parent directory`);
    return conditionallyLoadParentStylingConfig(path, childConfig, componentName);
  }
}

export default function loadStylingConfigs({ componentName, sourceDir }: Metadata): StylingConfig {
  return loadStylingConfig(sourceDir, { outputPath: "" }, componentName);
}
