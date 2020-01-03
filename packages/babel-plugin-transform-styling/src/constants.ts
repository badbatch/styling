export const FILENAME_REGEX = /.*(styling|\.styling)\.(js|jsx|ts|tsx)$/;

export const FILE_COMMENT_AND_IMPORT = `
// This file is auto-generated, do not edit directly.
import styling from "@styling/core";
`;

export const PROP_LIST_PLACEHOLDER = "%{propList}" as const;
export const RELEVANT_PROP_KEYS_PLACEHOLDER = "%{relevantPropKeys}" as const;
export const PROPS_TO_CLASSNAMES_MAP_PLACEHOLDER = "%{propsToClassNamesMap}" as const;

export const COMPONENT_EXPORT = `
export const EXPORT_NAME = styling(COMPONENT, ${PROP_LIST_PLACEHOLDER}, ${RELEVANT_PROP_KEYS_PLACEHOLDER}, ${PROPS_TO_CLASSNAMES_MAP_PLACEHOLDER});
`;

export const IDENTIFIER = "Identifier" as const;
export const STRING_LITERAL = "StringLiteral" as const;

export const STYLED_FUNC_NAME = "styled";
