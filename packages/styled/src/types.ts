import { CSSObject } from "postcss-js";

export type PropKeyComboCSSEntry = [
  string,
  {
    css: CSSObject;
    keyCombo: string[];
    selector: string;
  },
];

export type PropKeyComboCSS = PropKeyComboCSSEntry[];

export type PropListExact<P extends {}> = (keyof P | [keyof P, string[]] | [keyof P, string | number])[];
