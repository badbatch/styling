import { StylingNamedExports } from "../../types";

export interface MockBuildTransformedFile {
  _setFile: (file: string) => void;
  default: (namedExports: StylingNamedExports) => string;
}

export interface MockEvalStylingFile {
  _setFile: (file: StylingNamedExports) => void;
  default: (filename: string) => StylingNamedExports;
}
