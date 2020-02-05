import { PlainObject } from "./common";

export interface PathConfig {
  path: string;
  workingDir: "current" | "source" | "package" | "project";
}

export interface RawStylingConfig {
  cssOutputPath?: string | PathConfig;
  overrides?: PlainObject;
  selectorPrefix?: string;
  theme?: string | PathConfig | PlainObject;
}

export interface StylingConfig extends Omit<RawStylingConfig, "overrides"> {
  cssOutputPath: string;
  theme?: PlainObject;
}
