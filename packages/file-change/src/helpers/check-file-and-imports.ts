import { importSourceIsRelativePath, warn } from "@styling/helpers";
import { existsSync, readFileSync, statSync } from "fs-extra";
import glob from "glob";
import { parse, resolve } from "path";
import { GLOB_JS_FILE_EXTS, IMPORT_REQUIRE_REGEX, IMPORT_REQUIRE_REGEX_GLOB } from "../constants";
import { CheckFileAndImportsOptions } from "../types";

export default function checkFileAndImports(
  filePath: string,
  { lastCheckedFiles, parentLastCheckedTimestamp }: CheckFileAndImportsOptions,
): boolean {
  const { ext } = parse(filePath);
  let _filePath: string;

  if (ext) {
    _filePath = filePath;
  } else {
    _filePath = glob.sync(`${filePath}${GLOB_JS_FILE_EXTS}`)[0];

    if (!_filePath) {
      _filePath = glob.sync(`${filePath}/index${GLOB_JS_FILE_EXTS}`)[0];
    }
  }

  if (!existsSync(_filePath)) {
    warn(`fileChanged expected to find a file at path: ${_filePath}`);
    return true;
  }

  const stats = statSync(_filePath);

  if (stats.isDirectory()) {
    warn(`fileChanged expected to find a file, but found a directory at path: ${_filePath}`);
    return true;
  }

  const lastCheckedTimestamp = lastCheckedFiles[_filePath] || parentLastCheckedTimestamp;

  if (!lastCheckedTimestamp) {
    lastCheckedFiles[_filePath] = Date.now();
    return true;
  }

  if (stats.mtimeMs > lastCheckedTimestamp) {
    lastCheckedFiles[_filePath] = Date.now();
    return true;
  }

  const fileContents = readFileSync(_filePath, { encoding: "utf8" });
  const globMatches = fileContents.match(IMPORT_REQUIRE_REGEX_GLOB);

  if (!globMatches) {
    lastCheckedFiles[_filePath] = Date.now();
    return false;
  }

  const { dir } = parse(_filePath);

  return globMatches.reduce((hasChanged: boolean, globMatch) => {
    const match = globMatch.match(IMPORT_REQUIRE_REGEX);
    if (!match) return hasChanged;

    const importSource = match.slice(1).find(entry => !!entry);
    if (!importSource || !importSourceIsRelativePath(importSource)) return hasChanged;

    const hasImportChanged = checkFileAndImports(resolve(dir, importSource), {
      lastCheckedFiles,
      parentLastCheckedTimestamp: lastCheckedTimestamp,
    });

    if (hasImportChanged) {
      hasChanged = hasImportChanged;
    }

    return hasChanged;
  }, false);
}
