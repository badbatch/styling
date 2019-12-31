import { Interpolation, StylingProps } from "@styling/types";
import { ComponentType, ReactHTML, ReactSVG } from "react";
import buildPropsToClassNamesMap from "./helpers/build-props-to-classnames-map";
import filterCSSVariables from "./helpers/filter-css-variables";
import filterOutCSSVariables from "./helpers/filter-out-css-variables";
import generatePropNameCombos from "./helpers/generate-prop-name-combos";
import interweaveInterpolations from "./helpers/interweave-interpolations";
import { StylingPropsExact } from "./types";

export default function styled<P extends {}>(
  component: ComponentType | keyof ReactHTML | keyof ReactSVG,
  props: StylingPropsExact<P>,
  componentName: string,
) {
  return (strings: TemplateStringsArray, ...values: Interpolation[]) => {
    return {
      props,
      propsToClassNamesMap: buildPropsToClassNamesMap(
        componentName,
        generatePropNameCombos(filterOutCSSVariables((props as unknown) as StylingProps)),
        filterCSSVariables((props as unknown) as StylingProps),
        interweaveInterpolations(strings, values),
      ),
    };
  };
}
