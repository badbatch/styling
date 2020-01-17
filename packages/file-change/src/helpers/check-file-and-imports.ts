import { importSourceIsRelativePath, warn } from "@styling/helpers";
import { existsSync, readFileSync, statSync } from "fs-extra";
import { parse, resolve } from "path";
import { IMPORT_REQUIRE_REGEX, IMPORT_REQUIRE_REGEX_GLOB } from "../constants";
import { CheckFileAndImportsOptions } from "../types";

export default function checkFileAndImports(
  filePath: string,
  { lastCheckedFiles }: CheckFileAndImportsOptions,
): boolean {
  if (!existsSync(filePath)) {
    warn(`fileChanged expected to find a file at path: ${filePath}`);
    return true;
  }

  const stats = statSync(filePath);

  if (stats.isDirectory()) {
    warn(`fileChanged expected to find a file, but found a directory at path: ${filePath}`);
    return true;
  }

  const lastCheckedTimestamp = lastCheckedFiles[filePath];

  if (!lastCheckedTimestamp) {
    lastCheckedFiles[filePath] = Date.now();
    return true;
  }

  if (stats.mtimeMs > lastCheckedTimestamp) {
    lastCheckedFiles[filePath] = Date.now();
    return true;
  }

  const fileContents = readFileSync(filePath, { encoding: "utf8" });
  const globMatches = fileContents.match(IMPORT_REQUIRE_REGEX_GLOB);

  if (!globMatches) {
    lastCheckedFiles[filePath] = Date.now();
    return false;
  }

  const { dir } = parse(filePath);

  return globMatches.reduce((hasChanged: boolean, globMatch) => {
    const match = globMatch.match(IMPORT_REQUIRE_REGEX);
    if (!match) return hasChanged;

    const importSource = match.slice(1).find(entry => !!entry);
    if (!importSource || !importSourceIsRelativePath(importSource)) return hasChanged;

    const hasImportChanged = checkFileAndImports(resolve(dir, importSource), { lastCheckedFiles });

    if (hasImportChanged) {
      hasChanged = hasImportChanged;
    }

    return hasChanged;
  }, false);
}
