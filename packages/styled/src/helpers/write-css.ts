import { outputFileSync } from "fs-extra";

export default function writeCSS(outputPath: string, css: string) {
  outputFileSync(outputPath, css, { encoding: "utf-8" });
}
