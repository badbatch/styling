import { error, getFullOutputPath, getStylingFolderPath, info, loadStylingConfig } from "@styling/helpers";
import { existsSync, outputFileSync } from "fs-extra";
import { resolve } from "path";
import { CSS_FILE_EXT, JS_FILE_EXT, TEMP_FILES_FOLDER_NAME } from "../constants";
import { StylingExports } from "../types";
import removeFileAndEmptyFolders from "./remove-file-and-empty-folders";

export default function evalStylingFile(code: string, sourceFilename: string, addCSSImportToJSOutput: boolean) {
  const { cssOutputPath } = loadStylingConfig({ sourceFilename });

  const cssDistOutputPath = getFullOutputPath(cssOutputPath, sourceFilename, {
    exclude: "src",
    extension: CSS_FILE_EXT,
  });

  if (existsSync(cssDistOutputPath)) {
    info(`styling file already exists, so removing file from: ${cssDistOutputPath}`);
    removeFileAndEmptyFolders(cssDistOutputPath, cssOutputPath);
  }

  const stylingFolderPath = resolve(getStylingFolderPath(), TEMP_FILES_FOLDER_NAME);
  const tempOutputPath = getFullOutputPath(stylingFolderPath, sourceFilename, { extension: JS_FILE_EXT });

  if (!existsSync(tempOutputPath)) {
    info(`Temp styling does not exist, so writing file to: ${tempOutputPath}`);
    outputFileSync(tempOutputPath, code, { encoding: "utf8" });
  }

  let output: StylingExports | undefined;

  try {
    require = require("esm")(module);

    if (addCSSImportToJSOutput) {
      require.extensions[".css"] = () => {}; // tslint:disable-line no-empty
    }

    output = require(tempOutputPath);
    removeFileAndEmptyFolders(tempOutputPath, stylingFolderPath);
  } catch (e) {
    error("Error evaluating styling file", e);
    removeFileAndEmptyFolders(tempOutputPath, stylingFolderPath);
  }

  return output;
}
