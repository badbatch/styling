import { NodePath, Visitor } from "@babel/traverse";
import { PathConfig, PropList, StringObject } from "@styling/types";

export type ExportsArgsMap = Map<string, { type: string; value: string }>;

export interface ExportsArgsResult {
  identifiers: string[];
  map: ExportsArgsMap;
}

export interface MockBuildTransformedFile {
  _setFile: (file: string) => void;
  default: (namedExports: StylingExports) => string;
}

export interface MockEvalStylingFile {
  _getOriginal: () => string;
  _setMock: (file: StylingExports) => void;
  default: (filename: string) => StylingExports;
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

export interface StylingExport {
  propList: PropList;
  propsToClassNamesMap: StringObject;
  relevantPropKeys: string[];
}

export interface StylingExports {
  [key: string]: StylingExport;
}

export interface StylingPluginOptions {
  addCSSImportToJSOutput?: {
    jsOutputPath?: string | PathConfig;
  };
  logLevel?: "error" | "warn" | "info";
}
