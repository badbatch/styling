import { error, getFullOutputPath, info, loadStylingConfig } from "@styling/helpers";
import appRoot from "app-root-path";
import { existsSync, outputFileSync } from "fs-extra";
import { resolve } from "path";
import { CSS_FILE_EXT, JS_FILE_EXT, STYLING_FOLDER_NAME, TEMP_FILES_FOLDER_NAME } from "../constants";
import { StylingExports } from "../types";
import removeFileAndEmptyFolders from "./remove-file-and-empty-folders";

export default function evalStylingFile(code: string, sourceFilename: string) {
  const { outputPath } = loadStylingConfig({ sourceFilename });
  const cssDistOutputPath = getFullOutputPath(outputPath, sourceFilename, CSS_FILE_EXT, "src");

  /**
   * TODO: Remove this once we come up with a way of storing
   * output of previous run and returning it upstream, meaning
   * this hack will no longer be required.
   */
  if (process.env.STYLING_WRITE_CSS && existsSync(cssDistOutputPath)) {
    info(`styling file already exists, so removing file from: ${cssDistOutputPath}`);
    removeFileAndEmptyFolders(cssDistOutputPath, outputPath);
  }

  const stylingFolderPath = resolve(appRoot.toString(), STYLING_FOLDER_NAME, TEMP_FILES_FOLDER_NAME);
  const tempOutputPath = getFullOutputPath(stylingFolderPath, sourceFilename, JS_FILE_EXT);

  if (!existsSync(tempOutputPath)) {
    info(`Temp styling does not exist, so writing file to: ${tempOutputPath}`);
    outputFileSync(tempOutputPath, code, { encoding: "utf8" });
  }

  /**
   * TODO: Probably need to add @babel/register back
   * in to make sure eval does not throw exception on
   * unsupported syntax.
   */

  let output: StylingExports | undefined;

  try {
    require = require("esm")(module);
    output = require(tempOutputPath);
    removeFileAndEmptyFolders(tempOutputPath, stylingFolderPath);
  } catch (e) {
    error("Error evaluating styling file", e);
    removeFileAndEmptyFolders(tempOutputPath, stylingFolderPath);
  }

  return output;
}
