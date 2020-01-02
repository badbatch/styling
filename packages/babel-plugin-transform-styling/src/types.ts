import { NodePath, Visitor } from "@babel/traverse";
import { StringObject } from "@styling/types";

export type ExportsArgsMap = Map<string, { type: string; value: string }>;

export interface ExportsArgsResult {
  identifiers: string[];
  map: ExportsArgsMap;
}

export interface MockBuildTransformedFile {
  _setFile: (file: string) => void;
  default: (namedExports: StylingNamedExports) => string;
}

export interface MockEvalStylingFile {
  _setFile: (file: StylingNamedExports) => void;
  default: (filename: string) => StylingNamedExports;
}

export interface PluginState {
  cwd: string;
  file: {
    path: NodePath;
  };
  filename: string;
}

export interface PluginResult {
  visitor: Visitor<PluginState>;
}

export interface StylingNamedExport {
  props: Array<string | [string, string[]] | [string, string | number]>;
  propsToClassNamesMap: StringObject;
}

export interface StylingNamedExports {
  [key: string]: StylingNamedExport;
}

export interface StylingPluginOptions {
  logLevel?: "error" | "warn" | "info";
}
