export default function importSourceIsRelativePath(importSource: string) {
  return importSource.startsWith("./") || importSource.startsWith("../");
}
