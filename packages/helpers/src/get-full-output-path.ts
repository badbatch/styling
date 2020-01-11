import { join, parse } from "path";

export default function getFullOutputPath(
  outputPath: string,
  sourceFilename: string,
  extension: string,
  exclude?: string,
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

  let match = (dir.match(new RegExp(`^${sharedPath}(.+)$`)) as RegExpMatchArray)[1];

  if (exclude && match.startsWith(exclude)) {
    match = match.substring(exclude.length);
  }

  return join(outputPath, match, `${name}${extension || ext}`);
}
