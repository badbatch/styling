import { PathConfig } from "@styling/types";
import appRoot from "app-root-path";
import { isString } from "lodash";
import { resolve } from "path";

export default function getPathFromConfig(
  pathConfig: string | PathConfig,
  currentDir: string,
  sourceDir: string,
  packageDir?: string,
) {
  let path: string | undefined;

  if (isString(pathConfig)) {
    path = resolve(currentDir, pathConfig);
  } else {
    let workingDir: string;

    switch (true) {
      case pathConfig?.workingDir === "current":
        workingDir = currentDir;
        break;
      case pathConfig?.workingDir === "package" && !!packageDir:
        workingDir = packageDir as string;
        break;
      case pathConfig?.workingDir === "project":
        workingDir = appRoot.toString();
        break;
      case pathConfig?.workingDir === "source":
        workingDir = sourceDir;
        break;
      default:
        workingDir = currentDir;
    }

    path = resolve(workingDir, pathConfig?.path);
  }

  return path;
}
