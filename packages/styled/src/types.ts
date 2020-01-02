import { CSSObject } from "postcss-js";

export interface Metadata {
  componentName: string;
  sourceDir: string;
}

export interface SelectorCSS {
  [key: string]: {
    css: CSSObject;
    key: string;
  };
}

export type StylingEnumProps = Array<[string, string[]]>;

export type StylingCSSVariables = Array<[string, string | number]>;

export type StylingPropsWithoutCSSVariables = Array<string | [string, string[]]>;

export type StylingPropsExact<P extends {}> = Array<keyof P | [keyof P, string[]] | [keyof P, string | number]>;
