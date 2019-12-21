import { NodePath, Visitor } from "@babel/traverse";
import { StringObject } from "@styling/types";

export type ExportsArgsMap = Map<string, { type: string; value: string }>;

export interface ExportsArgsResult {
  identifiers: string[];
  map: ExportsArgsMap;
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
  propsToClassNamesMap: StringObject;
}

export interface StylingNamedExports {
  [key: string]: StylingNamedExport;
}
