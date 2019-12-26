import { PlainObject } from "./common";

export interface StylingConfig {
  theme?: PlainObject;
}

export interface RawStylingConfig {
  overrides?: PlainObject;
  theme?: string;
}
