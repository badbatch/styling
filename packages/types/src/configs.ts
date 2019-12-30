import { PlainObject } from "./common";

export interface RawStylingConfig {
  outputPath?: string;
  overrides?: PlainObject;
  selectorPrefix?: string;
  theme?: string | PlainObject;
}

export interface StylingConfig extends Omit<RawStylingConfig, "overrides"> {
  theme?: PlainObject;
}
