import { PlainObject } from "./common";

export interface StylingConfig {
  outputPath?: string;
  theme?: PlainObject;
}

export interface RawStylingConfig {
  outputPath?: string;
  overrides?: PlainObject;
  theme?: string | PlainObject;
}
