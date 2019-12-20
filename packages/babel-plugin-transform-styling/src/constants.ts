export const FILENAME_REGEX = /.*(styling|\.styling)\.(js|jsx|ts|tsx)$/;

export const FILE_COMMENT_AND_IMPORT = `
  // This file is auto generated. Do not edit directly.
  import { styled } from "@styling/core";
`;

export const EXPORT_NAME_PLACEHOLDER = "%{exportName}" as const;
export const TAG_NAME_PLACEHOLDER = "%{tagName}" as const;
export const PROPS_TO_CLASSNAMES_MAP_PLACEHOLDER = "propsToClassNamesMap" as const;

export const COMPONENT_EXPORT = `
  export const ${EXPORT_NAME_PLACEHOLDER} = styled("${TAG_NAME_PLACEHOLDER}", ${PROPS_TO_CLASSNAMES_MAP_PLACEHOLDER});
`;
