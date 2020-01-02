import { appendFileSync, existsSync, outputFileSync } from "fs-extra";
import { resolve } from "path";
import { STYLING_CSS_FILENAME } from "../constants";

export default function writeCSS(css: string, outputPath: string) {
  const fullOutputPath = resolve(outputPath, STYLING_CSS_FILENAME);

  if (existsSync(fullOutputPath)) {
    appendFileSync(fullOutputPath, css, { encoding: "utf-8" });
  } else {
    outputFileSync(fullOutputPath, css, { encoding: "utf-8" });
  }
}
