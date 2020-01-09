import { readdirSync, removeSync } from "fs-extra";
import { parse, resolve } from "path";

export default function removeFileAndEmptyFolders(filePath: string, stopAtPath: string) {
  const { dir } = parse(filePath);
  if (dir === stopAtPath) return;

  removeSync(filePath);

  if (!readdirSync(dir).length) {
    removeSync(dir);
  }

  removeFileAndEmptyFolders(resolve(dir, ".."), stopAtPath);
}
