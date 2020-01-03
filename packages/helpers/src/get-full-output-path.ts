import { parse, resolve } from "path";

export default function getFullOutputPath(outputPath: string, sourceFilename: string) {
  const { dir, name } = parse(sourceFilename);
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

  if (match.startsWith("src")) {
    match = match.substring(3);
  }

  return resolve(`${outputPath}${match}/${name}.css`);
}
