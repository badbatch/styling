import { PlainObject } from "./common";

export interface PathConfig {
  path: string;
  workingDir: "current" | "source";
}

export interface RawStylingConfig {
  outputPath?: string | PathConfig;
  overrides?: PlainObject;
  selectorPrefix?: string;
  theme?: string | PathConfig | PlainObject;
}

export interface StylingConfig extends Omit<RawStylingConfig, "overrides"> {
  outputPath: string;
  theme?: PlainObject;
}
