import { getCachedFilePath, getFullOutputPath } from "@styling/helpers";
import { outputFileSync, readFileSync } from "fs-extra";
import { CSS_FILE_EXT } from "../constants";

export default function copyCachedCSS(filename: string, cssOutputPath: string) {
  outputFileSync(
    getFullOutputPath(cssOutputPath, filename, { exclude: "src", extension: CSS_FILE_EXT }),
    readFileSync(getCachedFilePath(`${filename}::stying`), { encoding: "utf8" }),
    { encoding: "utf8" },
  );
}
