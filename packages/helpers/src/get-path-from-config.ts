import { PathConfig } from "@styling/types";
import { isString } from "lodash";
import { resolve } from "path";

export default function getPathFromConfig(themeConfig: string | PathConfig, currentDir: string, sourceDir: string) {
  let themePath: string | undefined;

  if (isString(themeConfig)) {
    themePath = resolve(currentDir, themeConfig);
  } else {
    const workingDir = themeConfig?.workingDir === "source" ? sourceDir : currentDir;
    themePath = resolve(workingDir, themeConfig?.path);
  }

  return themePath;
}
