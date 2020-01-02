import { appendFile } from "fs-extra";
import { resolve } from "path";
import { STYLING_CSS_FILENAME } from "../constants";

export default function writeCSS(css: string, outputPath: string) {
  appendFile(resolve(outputPath, STYLING_CSS_FILENAME), css, { encoding: "utf-8" });
}
