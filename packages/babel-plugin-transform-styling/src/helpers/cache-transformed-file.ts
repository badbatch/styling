import generator from "@babel/generator";
import { Program } from "@babel/types";
import { getCachedFilePath } from "@styling/helpers";
import { outputFileSync } from "fs-extra";

export default function cacheTransformedFile(filename: string, transformedFile: Program) {
  outputFileSync(getCachedFilePath(filename), generator(transformedFile).code, { encoding: "utf8" });
}
