import { join, parse } from "path";

export default function getFullOutputPath(
  outputPath: string,
  sourceFilename: string,
  { exclude, extension }: { exclude?: string; extension?: string } = {},
) {
  const { dir, ext, name } = parse(sourceFilename);
  const splitSourceDir = dir.split("");
  const splitOutputPath = outputPath.split("");
  let sharedPath = "";

  for (let i = 0; i < splitSourceDir.length; i += 1) {
    const l = splitSourceDir[i];

    if (splitOutputPath[i] === l) {
      sharedPath += l;
    } else {
      break;
    }
  }

  /**
   * TODO: Need to defensively code against no match.
   */

  let match = (dir.match(new RegExp(`^${sharedPath}(.+)$`)) as RegExpMatchArray)[1];

  if (exclude && match.startsWith(exclude)) {
    match = match.substring(exclude.length);
  }

  return name ? join(outputPath, match, `${name}${extension || ext}`) : join(outputPath, match);
}
