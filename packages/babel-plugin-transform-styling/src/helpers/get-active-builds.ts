import { readFileSync } from "fs-extra";

export default function getActiveBuilds(activeBuildsFilePath: string) {
  return readFileSync(activeBuildsFilePath, { encoding: "utf8" })
    .split(",")
    .filter(val => !!val);
}
