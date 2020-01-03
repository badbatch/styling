import { getFullOutputPath } from "@styling/helpers";
import { appendFileSync, existsSync, outputFileSync } from "fs-extra";

export default function writeCSS(css: string, outputPath: string, sourceFilename: string) {
  const fullOutputPath = getFullOutputPath(outputPath, sourceFilename);

  if (existsSync(fullOutputPath)) {
    appendFileSync(fullOutputPath, css, { encoding: "utf-8" });
  } else {
    outputFileSync(fullOutputPath, css, { encoding: "utf-8" });
  }
}
