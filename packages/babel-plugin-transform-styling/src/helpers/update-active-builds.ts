import { getStylingFolderPath } from "@styling/helpers";
import { readFileSync, writeFileSync } from "fs-extra";
import murmurhash from "murmurhash";
import { resolve } from "path";
import { ACTIVE_BUILDS_FILENAME, TXT_FILE_EXT } from "../constants";

export default function updateActiveBuilds(filename: string) {
  const hashedFilePath = murmurhash.v3(filename).toString();
  const activeBuildsFilePath = resolve(getStylingFolderPath(), `${ACTIVE_BUILDS_FILENAME}${TXT_FILE_EXT}`);
  const activeBuilds = readFileSync(activeBuildsFilePath, { encoding: "utf8" }).split(",");
  writeFileSync(activeBuildsFilePath, `${activeBuilds.filter(activeBuild => activeBuild !== hashedFilePath).join()}`);
}
