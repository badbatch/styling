import { readFileSync } from "fs-extra";
import getCachedFilePath from "./get-cached-file-path";

export default function getTransformedFileFromCache(filename: string) {
  return readFileSync(getCachedFilePath(filename), { encoding: "utf8" });
}
