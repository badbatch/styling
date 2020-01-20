import { getCachedFilePath } from "@styling/helpers";
import { outputFileSync } from "fs-extra";

export default function writeCSS(sourceFilename: string, outputPath: string, css: string) {
  outputFileSync(outputPath, css, { encoding: "utf8" });
  outputFileSync(getCachedFilePath(`${sourceFilename}::stying`), css, { encoding: "utf8" });
}
