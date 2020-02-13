import { getStylingFolderPath, info } from "@styling/helpers";
import appRoot from "app-root-path";
import { spawnSync } from "child_process";
import { existsSync, outputFileSync } from "fs-extra";
import murmurhash from "murmurhash";
import { resolve } from "path";
import { ACTIVE_BUILDS_FILENAME, TXT_FILE_EXT, WATCH_ACTIVE_BUILDS_SCRIPT_PATH } from "../constants";
import getActiveBuilds from "./get-active-builds";
import getChildProcessDebugPort from "./get-child-process-debug-port";

export default function checkAndAwaitActiveBuild(filename: string) {
  const hashedFilePath = murmurhash.v3(filename).toString();
  const activeBuildsFilePath = resolve(getStylingFolderPath(), `${ACTIVE_BUILDS_FILENAME}${TXT_FILE_EXT}`);

  if (!existsSync(activeBuildsFilePath)) {
    info(`No active build file exists, creating active-builds.txt for ${filename}`);
    outputFileSync(activeBuildsFilePath, hashedFilePath, { encoding: "utf8" });
    return false;
  }

  const activeBuilds = getActiveBuilds(activeBuildsFilePath);

  if (!activeBuilds.includes(hashedFilePath)) {
    info(`No active build found, updating active-builds.txt for ${filename}`);
    activeBuilds.push(hashedFilePath);
    const activeBuildsList = activeBuilds.join();
    info(`Current active builds: ${activeBuildsList}`);
    outputFileSync(activeBuildsFilePath, `${activeBuildsList}`, { encoding: "utf8" });
    return false;
  }

  info(`Active build found, waiting for active build to finish for ${filename}`);
  const scriptPath = `${appRoot.toString()}${WATCH_ACTIVE_BUILDS_SCRIPT_PATH}`;

  const spawnArgs = [scriptPath, "--id", hashedFilePath, "--filename", filename];
  const debugPort = getChildProcessDebugPort();

  if (debugPort) {
    spawnArgs.unshift(`--inspect-brk=${debugPort}`);
  }

  spawnSync("node", spawnArgs, { encoding: "utf8", stdio: "inherit" });
  info(`Active build finished for ${filename}`);
  return true;
}
