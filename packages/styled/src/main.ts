import { Interpolation } from "@styling/types";
import { ComponentType, ReactHTML, ReactSVG } from "react";
import buildPropsToClassNamesMap from "./helpers/build-props-to-classnames-map";
import filterCSSVariables from "./helpers/filter-css-variables";
import filterOutCSSVariables from "./helpers/filter-out-css-variables";
import generatePropNameCombos from "./helpers/generate-prop-name-combos";
import interweaveInterpolations from "./helpers/interweave-interpolations";
import { StylingProps, StylingPropsGeneric } from "./types";

export default function styled<P extends {}>(
  component: ComponentType | keyof ReactHTML | keyof ReactSVG,
  props: StylingProps<P>,
  componentName: string,
) {
  return (strings: TemplateStringsArray, ...values: Interpolation[]) => {
    return {
      propsToClassNamesMap: buildPropsToClassNamesMap(
        componentName,
        generatePropNameCombos(filterOutCSSVariables((props as unknown) as StylingPropsGeneric)),
        filterCSSVariables((props as unknown) as StylingPropsGeneric),
        interweaveInterpolations(strings, values),
      ),
    };
  };
}
