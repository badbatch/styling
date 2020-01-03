import { difference, intersection } from "lodash";
import { parse, resolve } from "path";
import { STYLING_CSS_FILENAME_SUFFIX } from "./constants";

export default function getFullOutputPath(outputPath: string, sourceFilename: string) {
  const { dir, name } = parse(sourceFilename);
  const sharedPath = intersection(dir.split(""), outputPath.split("")).join("");
  const uniqueSourcePath = difference(sharedPath.split(""), dir.split("")).join("");
  return resolve(outputPath, uniqueSourcePath, `${name}${STYLING_CSS_FILENAME_SUFFIX}`);
}
