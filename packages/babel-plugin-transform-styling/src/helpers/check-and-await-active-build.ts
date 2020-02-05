import { getStylingFolderPath, info } from "@styling/helpers";
import appRoot from "app-root-path";
import { execSync } from "child_process";
import { existsSync, outputFileSync } from "fs-extra";
import murmurhash from "murmurhash";
import { resolve } from "path";
import { ACTIVE_BUILDS_FILENAME, TXT_FILE_EXT, WATCH_ACTIVE_BUILDS_SCRIPT_PATH } from "../constants";
import getActiveBuilds from "./get-active-builds";

export default function checkAndAwaitActiveBuild(filename: string) {
  const hashedFilePath = murmurhash.v3(filename).toString();
  const activeBuildsFilePath = resolve(getStylingFolderPath(), `${ACTIVE_BUILDS_FILENAME}${TXT_FILE_EXT}`);

  if (!existsSync(activeBuildsFilePath)) {
    info(`No active build file exists, creating active-builds.txt for ${filename}`);
    outputFileSync(activeBuildsFilePath, hashedFilePath, { encoding: "utf8" });
    return false;
  }

  const activeBuilds = getActiveBuilds(activeBuildsFilePath);

  if (!activeBuilds.find(activeBuild => activeBuild === hashedFilePath)) {
    info(`No active build found, updating active-builds.txt for ${filename}`);
    activeBuilds.push(hashedFilePath);
    const activeBuildsList = activeBuilds.join();
    info(`Current active builds: ${activeBuildsList}`);
    outputFileSync(activeBuildsFilePath, `${activeBuildsList}`, { encoding: "utf8" });
    return false;
  }

  info(`Active build found, waiting for active build to finish for ${filename}`);
  const scriptPath = `${appRoot.toString()}${WATCH_ACTIVE_BUILDS_SCRIPT_PATH}`;
  execSync(`node ${scriptPath} --id ${hashedFilePath} --filename ${filename}`, { stdio: "inherit" });
  info(`Active build finished for ${filename}`);
  return true;
}
