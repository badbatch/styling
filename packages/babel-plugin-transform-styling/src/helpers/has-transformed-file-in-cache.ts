import { getCachedFilePath, info } from "@styling/helpers";
import { existsSync } from "fs-extra";

export default function hasTransformedFileInCache(filename: string) {
  info(`Checking if transformed file in cache for ${filename}`);
  return existsSync(getCachedFilePath(filename));
}
