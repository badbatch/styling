import { getCachedFilePath } from "@styling/helpers";
import { outputFileSync } from "fs-extra";

export default function writeCSS(sourceFilename: string, cssOutputPath: string, css: string) {
  outputFileSync(cssOutputPath, css, { encoding: "utf8" });
  outputFileSync(getCachedFilePath(`${sourceFilename}::stying`), css, { encoding: "utf8" });
}
