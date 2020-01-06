import { kebabCase } from "lodash";
import murmurhash from "murmurhash";

export default function buildBaseSelector(sourceFilename: string, componentName: string, prefix?: string) {
  return `${prefix ? `${prefix}__` : ""}${kebabCase(componentName)}-${murmurhash.v3(
    `${sourceFilename}::${componentName}`,
  )}`;
}
