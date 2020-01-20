import { getCachedFilePath } from "@styling/helpers";
import { existsSync } from "fs-extra";

export default function hasTransformedFileInCache(filename: string) {
  return existsSync(getCachedFilePath(filename));
}
