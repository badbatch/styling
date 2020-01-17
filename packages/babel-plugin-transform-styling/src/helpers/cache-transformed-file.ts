import generator from "@babel/generator";
import { Program } from "@babel/types";
import { outputFileSync } from "fs-extra";
import getCachedFilePath from "./get-cached-file-path";

export default function cacheTransformedFile(filename: string, transformedFile: Program) {
  outputFileSync(getCachedFilePath(filename), generator(transformedFile).code, { encoding: "utf8" });
}
