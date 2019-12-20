import {
  COMPONENT_EXPORT,
  EXPORT_NAME_PLACEHOLDER,
  FILE_COMMENT_AND_IMPORT,
  PROPS_TO_CLASSNAMES_MAP_PLACEHOLDER,
  TAG_NAME_PLACEHOLDER,
} from "../constants";
import { StylingNamedExports } from "../types";

export default function buildTransformedFile(namedExports: StylingNamedExports) {
  return Object.keys(namedExports).reduce((file, name) => {
    const { propsToClassNamesMap, tagName } = namedExports[name];

    return `${file}${COMPONENT_EXPORT.replace(EXPORT_NAME_PLACEHOLDER, name)
      .replace(TAG_NAME_PLACEHOLDER, tagName)
      .replace(PROPS_TO_CLASSNAMES_MAP_PLACEHOLDER, JSON.stringify(propsToClassNamesMap))}`;
  }, FILE_COMMENT_AND_IMPORT);
}
