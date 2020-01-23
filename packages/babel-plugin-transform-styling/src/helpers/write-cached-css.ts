import { getCachedFilePath, getFullOutputPath } from "@styling/helpers";
import { outputFileSync, readFileSync } from "fs-extra";
import { CSS_FILE_EXT } from "../constants";

export default function writeCachedCSS(filename: string, outputPath: string) {
  outputFileSync(
    getFullOutputPath(outputPath, filename, CSS_FILE_EXT, "src"),
    readFileSync(getCachedFilePath(`${filename}::stying`), { encoding: "utf8" }),
    { encoding: "utf8" },
  );
}