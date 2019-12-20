import { StylingNamedExports } from "../types";

export default function loadStylingFile(filename: string): StylingNamedExports {
  return require(filename);
}
