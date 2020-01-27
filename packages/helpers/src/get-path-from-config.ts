import { PathConfig } from "@styling/types";
import { isString } from "lodash";
import { resolve } from "path";

export default function getPathFromConfig(
  themeConfig: string | PathConfig,
  currentDir: string,
  sourceDir: string,
  packageDir?: string,
) {
  let themePath: string | undefined;

  if (isString(themeConfig)) {
    themePath = resolve(currentDir, themeConfig);
  } else {
    let workingDir: string;

    switch (true) {
      case themeConfig?.workingDir === "current":
        workingDir = currentDir;
        break;
      case themeConfig?.workingDir === "package" && packageDir:
        workingDir = packageDir as string;
        break;
      case themeConfig?.workingDir === "source":
        workingDir = sourceDir;
        break;
      default:
        workingDir = currentDir;
    }

    themePath = resolve(workingDir, themeConfig?.path);
  }

  return themePath;
}
