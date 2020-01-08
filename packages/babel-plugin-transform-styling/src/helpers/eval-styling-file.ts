import { error, getFullOutputPath, info, loadStylingConfig } from "@styling/helpers";
import { existsSync, removeSync, writeFileSync } from "fs-extra";
import { parse } from "path";
import { StylingExports } from "../types";

export default function evalStylingFile(code: string, sourceFilename: string) {
  const { outputPath } = loadStylingConfig({ sourceFilename });
  const fullOutputPath = getFullOutputPath(outputPath, sourceFilename);

  /**
   * TODO: Remove this once we come up with a way of storing
   * output of previous run and returning it upstream, meaning
   * this hack will no longer be required.
   */
  if (process.env.STYLING_WRITE_CSS && existsSync(fullOutputPath)) {
    info(`styling file already exists, so removing file from: ${fullOutputPath}`);
    removeSync(fullOutputPath);
  }

  const { dir, ext, name } = parse(sourceFilename);
  const tempFilePath = `${dir}/__${name}.temp${ext}`;

  if (!existsSync(tempFilePath)) {
    info(`Temp styling does not exist, so writing file to: ${tempFilePath}`);
    writeFileSync(tempFilePath, code, { encoding: "utf-8" });
  }

  let output: StylingExports | undefined;

  try {
    require = require("esm")(module);
    output = require(tempFilePath);
    removeSync(tempFilePath);
  } catch (e) {
    error("Error evaluating styling file", e);
    removeSync(tempFilePath);
  }

  return output;
}
