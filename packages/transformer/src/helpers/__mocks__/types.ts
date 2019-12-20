import { StylingNamedExports } from "../../types";

export interface MockBuildTransformedFile {
  _setFile: (file: string) => void;
  default: (namedExports: StylingNamedExports) => string;
}

export interface MockLoadStylingFile {
  _setFile: (file: StylingNamedExports) => void;
  default: (filename: string) => StylingNamedExports;
}
