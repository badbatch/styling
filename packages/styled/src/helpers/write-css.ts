import { appendFileSync } from "fs-extra";

export default function writeCSS(css: string, fullOutputPath: string) {
  appendFileSync(fullOutputPath, css, { encoding: "utf-8" });
}
