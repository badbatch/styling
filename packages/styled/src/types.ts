import { CSSObject } from "postcss-js";

export interface PropKeyComboCSS {
  [key: string]: {
    css: CSSObject;
    keyCombo: string[];
    selector: string;
  };
}

export type PropListExact<P extends {}> = Array<keyof P | [keyof P, string[]] | [keyof P, string | number]>;
