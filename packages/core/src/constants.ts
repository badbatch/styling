export const ENUM_PROP_NAMESPACE_REGEX = /^(.*)::/;

export const PACKAGE_JSON_FILENAME = "package.json" as const;
export const STYLING_CONFIG_FILENAME = "styling.config.js" as const;
export const STYLING_CSS_FILENAME = "styling.css" as const;

export const COMBO_NUMBER_PLACEHOLDER = "%{number}";

export const EXCESSIVE_PROPS_WARNING = `Consider reducing the number of props driving the styling of this component.
  The props you have declared create ${COMBO_NUMBER_PLACEHOLDER} combinations.`;
