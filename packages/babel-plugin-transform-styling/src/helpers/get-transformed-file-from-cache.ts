import { getCachedFilePath } from "@styling/helpers";
import { readFileSync } from "fs-extra";

export default function getTransformedFileFromCache(filename: string) {
  return readFileSync(getCachedFilePath(filename), { encoding: "utf8" });
}
