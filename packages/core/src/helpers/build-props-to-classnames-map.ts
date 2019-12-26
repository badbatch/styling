import { Interpolation, StringObject } from "@styling/types";
import { StylingCSSVariablesGeneric } from "../types";
import loadStylingConfig from "./load-styling-config";

export default function buildPropsToClassNamesMap(
  propNameCombos: string[][],
  cssVariableProps: StylingCSSVariablesGeneric,
  interpolations: Interpolation[],
): StringObject {
  const stylingConfig = loadStylingConfig();
  // TODO
}
