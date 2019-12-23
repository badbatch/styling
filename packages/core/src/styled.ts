import { Interpolation } from "@styling/types";
import { ComponentType, ReactHTML, ReactSVG } from "react";
import buildPropsToClassNamesMap from "./helpers/build-props-to-classnames-map";
import generatePropNameCombos from "./helpers/generate-prop-name-combos";
import interweaveInterpolations from "./helpers/interweave-interpolations";
import { StylingProps, StylingPropsGeneric } from "./types";

export default function styled<P extends {}>(
  component: ComponentType | keyof ReactHTML | keyof ReactSVG,
  props: StylingProps<P>,
) {
  return (strings: TemplateStringsArray, ...values: Interpolation[]) => {
    return {
      propsToClassNamesMap: buildPropsToClassNamesMap(
        generatePropNameCombos((props as unknown) as StylingPropsGeneric),
        interweaveInterpolations(strings, values),
      ),
    };
  };
}
