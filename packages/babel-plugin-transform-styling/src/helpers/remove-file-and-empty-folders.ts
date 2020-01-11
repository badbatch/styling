import { error } from "@styling/helpers";
import appRoot from "app-root-path";
import { existsSync, readdirSync, removeSync, statSync } from "fs-extra";
import { parse, resolve } from "path";

export default function removeFileAndEmptyFolders(filePath: string, stopAtPath: string) {
  if (!existsSync(filePath)) {
    error(`Unable to remove file and empty folders as path does not exist: ${filePath}`);
    return;
  }

  if (filePath === stopAtPath || filePath === appRoot.toString()) return;

  const stats = statSync(filePath);

  if (stats.isFile()) {
    removeSync(filePath);
  }

  const dirPath = stats.isFile() ? parse(filePath).dir : filePath;
  const files = readdirSync(dirPath);

  if (!files.length) {
    removeSync(dirPath);
  }

  removeFileAndEmptyFolders(resolve(dirPath, ".."), stopAtPath);
}
