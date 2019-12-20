import { NodePath, Visitor } from "@babel/traverse";
import { StringObject } from "@styling/types";
import { ReactHTML, ReactSVG } from "react";

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
  tagName: keyof ReactHTML | keyof ReactSVG;
}

export interface StylingNamedExports {
  [key: string]: StylingNamedExport;
}
