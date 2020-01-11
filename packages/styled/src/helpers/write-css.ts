import { getFullOutputPath } from "@styling/helpers";
import { appendFileSync, existsSync, outputFileSync } from "fs-extra";
import { CSS_FILE_EXT } from "../constants";

export default function writeCSS(css: string, outputPath: string, sourceFilename: string) {
  const fullOutputPath = getFullOutputPath(outputPath, sourceFilename, CSS_FILE_EXT, "src");

  if (existsSync(fullOutputPath)) {
    appendFileSync(fullOutputPath, css, { encoding: "utf-8" });
  } else {
    outputFileSync(fullOutputPath, css, { encoding: "utf-8" });
  }
}
