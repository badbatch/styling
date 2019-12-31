import { CSSObject } from "postcss-js";
import { ReactNode } from "react";

export type ForwardedProps<P extends object> = { children?: ReactNode; className?: string } & P;

export type ReturnedElementProps<P extends {}, R extends Element> = {
  children?: ReactNode;
  className?: string;
  ref?: React.Ref<R>;
} & P;

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
