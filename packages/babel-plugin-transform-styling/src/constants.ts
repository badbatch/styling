export const FILENAME_REGEX = /.*(styling|\.styling)\.(js|jsx|ts|tsx)$/;

export const FILE_COMMENT_AND_IMPORT = `
// This file is auto-generated, do not edit directly.
import styling from "@styling/core";
`;

export const STYLING_PROPS_PLACEHOLDER = "%{props}" as const;
export const PROPS_TO_CLASSNAMES_MAP_PLACEHOLDER = "%{propsToClassNamesMap}" as const;

export const COMPONENT_EXPORT = `
export const EXPORT_NAME = styling(COMPONENT, ${STYLING_PROPS_PLACEHOLDER}, ${PROPS_TO_CLASSNAMES_MAP_PLACEHOLDER});
`;

export const IDENTIFIER = "Identifier" as const;
export const STRING_LITERAL = "StringLiteral" as const;
