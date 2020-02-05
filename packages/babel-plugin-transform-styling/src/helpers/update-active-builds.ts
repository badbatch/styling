import { getStylingFolderPath, info } from "@styling/helpers";
import { outputFileSync } from "fs-extra";
import murmurhash from "murmurhash";
import { resolve } from "path";
import { ACTIVE_BUILDS_FILENAME, TXT_FILE_EXT } from "../constants";
import getActiveBuilds from "./get-active-builds";

export default function updateActiveBuilds(filename: string) {
  info(`Updating active builds for ${filename}`);
  const hashedFilePath = murmurhash.v3(filename).toString();
  const activeBuildsFilePath = resolve(getStylingFolderPath(), `${ACTIVE_BUILDS_FILENAME}${TXT_FILE_EXT}`);
  const activeBuilds = getActiveBuilds(activeBuildsFilePath);
  const activeBuildsList = activeBuilds.filter(activeBuild => activeBuild !== hashedFilePath).join();
  info(`Current active builds: ${activeBuildsList || "none"}`);

  outputFileSync(activeBuildsFilePath, `${activeBuildsList}`, {
    encoding: "utf8",
  });
}
