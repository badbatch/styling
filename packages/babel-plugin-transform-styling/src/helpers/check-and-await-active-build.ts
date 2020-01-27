import { getStylingFolderPath, info } from "@styling/helpers";
import appRoot from "app-root-path";
import { execSync } from "child_process";
import { existsSync, outputFileSync, readFileSync } from "fs-extra";
import murmurhash from "murmurhash";
import { resolve } from "path";
import { ACTIVE_BUILDS_FILENAME, TXT_FILE_EXT } from "../constants";

export default function checkAndAwaitActiveBuild(filename: string) {
  const hashedFilePath = murmurhash.v3(filename).toString();
  const activeBuildsFilePath = resolve(getStylingFolderPath(), `${ACTIVE_BUILDS_FILENAME}${TXT_FILE_EXT}`);

  if (!existsSync(activeBuildsFilePath)) {
    info("No active build file exists");
    outputFileSync(activeBuildsFilePath, hashedFilePath, { encoding: "utf8" });
    return false;
  }

  const activeBuilds = readFileSync(activeBuildsFilePath, { encoding: "utf8" }).split(",");

  if (!activeBuilds.find(activeBuild => activeBuild === hashedFilePath)) {
    info(`No active build found for ${filename}`);
    activeBuilds.push(hashedFilePath);
    outputFileSync(activeBuildsFilePath, `${activeBuilds.join()}`, { encoding: "utf8" });
    return false;
  }

  info(`Active build found for ${filename}`);
  const scriptPath = `${appRoot.toString()}/node_modules/@styling/babel-plugin-transform-styling/bin/watch-active-builds`;
  execSync(`node ${scriptPath} --id ${hashedFilePath} --filename ${filename}`);
  return true;
}
