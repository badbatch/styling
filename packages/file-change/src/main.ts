import { verbose } from "@styling/helpers";
import { PlainObject } from "@styling/types";
import appRoot from "app-root-path";
import { existsSync, outputFileSync } from "fs-extra";
import { resolve } from "path";
import { LAST_CHECKED_FILES_FILENAME, STYLING_FOLDER_NAME } from "./constants";
import checkFileAndImports from "./helpers/check-file-and-imports";

export default function fileChanged(filePath: string) {
  if (!existsSync(filePath)) {
    verbose(`fileChanged expected to find a file at path: ${filePath}`);
    return true;
  }

  const lastCheckedFilesPath = resolve(appRoot.toString(), STYLING_FOLDER_NAME, LAST_CHECKED_FILES_FILENAME);
  let lastCheckedFiles: PlainObject;

  try {
    lastCheckedFiles = require(lastCheckedFilesPath);
  } catch {
    lastCheckedFiles = {};
  }

  const hasFileChanged = checkFileAndImports(filePath, { lastCheckedFiles });
  outputFileSync(lastCheckedFilesPath, JSON.stringify(lastCheckedFiles, null, 2), { encoding: "utf8" });
  return hasFileChanged;
}
