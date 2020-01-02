import { kebabCase } from "lodash";
import shortid from "shortid";

export default function buildBaseSelector(componentName: string, prefix?: string) {
  return `${prefix ? `${prefix}__` : ""}${kebabCase(componentName)}-${shortid.generate()}`;
}
