import { existsSync } from "fs-extra";
import getCachedFilePath from "./get-cached-file-path";

export default function hasTransformedFileInCache(filename: string) {
  return existsSync(getCachedFilePath(filename));
}
