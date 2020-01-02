import { CSSObject } from "postcss-js";

export interface Metadata {
  componentName: string;
  sourceDir: string;
}

export interface MockBuildBaseSelector {
  _setSelector: (selector: string) => void;
  default: (componentName: string, prefix?: string) => string;
}

export interface PropKeyComboCSS {
  [key: string]: {
    css: CSSObject;
    keyCombo: string[];
    selector: string;
  };
}

export type PropListExact<P extends {}> = Array<keyof P | [keyof P, string[]] | [keyof P, string | number]>;
