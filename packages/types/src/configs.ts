import { Required } from "utility-types";
import { PlainObject } from "./common";

export interface RawStylingConfig {
  outputPath?: string;
  overrides?: PlainObject;
  selectorPrefix?: string;
  theme?: string | PlainObject;
}

export interface StylingConfig extends Required<Omit<RawStylingConfig, "overrides">, "outputPath"> {
  theme?: PlainObject;
}
