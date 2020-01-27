import { Metadata, RawStylingConfig, StylingConfig } from "@styling/types";
import appRoot from "app-root-path";
import { existsSync } from "fs-extra";
import { cloneDeep, mergeWith } from "lodash";
import { parse, resolve } from "path";
import { Optional } from "utility-types";
import { PACKAGE_JSON_FILENAME, STYLING_CONFIG_FILENAME } from "./constants";
import { verbose } from "./log";
import parseStylingConfig from "./parse-styling-config";

const stylingConfigs: Map<string, StylingConfig> = new Map();

function conditionallyLoadParentStylingConfig(
  path: string,
  childConfig: StylingConfig,
  sourceDir: string,
  componentName?: string,
  childPackageDir?: string,
) {
  if (appRoot.toString() === path) return childConfig;
  return loadStylingConfig(resolve(path, ".."), childConfig, sourceDir, componentName, childPackageDir);
}

function loadStylingConfig(
  path: string,
  childConfig: StylingConfig,
  sourceDir: string,
  componentName?: string,
  childPackageDir?: string,
): StylingConfig {
  const packageJsonPath = resolve(path, PACKAGE_JSON_FILENAME);
  const packageDir = !childPackageDir && existsSync(packageJsonPath) ? path : childPackageDir;

  try {
    let config: StylingConfig;

    if (stylingConfigs.has(path)) {
      config = cloneDeep(stylingConfigs.get(path)) as StylingConfig;
    } else {
      try {
        verbose(`Loading styling config from directory ${path}`);

        config = parseStylingConfig(
          require(resolve(path, STYLING_CONFIG_FILENAME)) as RawStylingConfig,
          path,
          sourceDir,
          componentName,
          packageDir,
        );
      } catch {
        verbose("No styling config found, falling back to package.json");

        config = parseStylingConfig(
          require(resolve(path, PACKAGE_JSON_FILENAME)).styling as RawStylingConfig,
          path,
          sourceDir,
          componentName,
          packageDir,
        );
      }

      stylingConfigs.set(path, config);
    }

    return conditionallyLoadParentStylingConfig(
      path,
      mergeWith(config, childConfig, (value, srcValue) => {
        if (!srcValue) return value;
      }),
      sourceDir,
      componentName,
      packageDir,
    );
  } catch {
    verbose("No styling config found in package.json, checking parent directory");
    return conditionallyLoadParentStylingConfig(path, childConfig, sourceDir, componentName, packageDir);
  }
}

export default function loadStylingConfigs({
  componentName,
  sourceFilename,
}: Optional<Metadata, "componentName" | "propList">): StylingConfig {
  const { dir } = parse(sourceFilename);
  return loadStylingConfig(dir, { outputPath: "" }, dir, componentName);
}
