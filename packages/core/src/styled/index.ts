import { ComponentType, ReactHTML, ReactSVG, createElement, forwardRef } from "react";
import buildPropsToClassNamesMap from "../build-props-to-classnames-map";
import Component from "../component";
import interweaveInterpolations from "../interweave-interpolations";
import { Interpolation } from "../types";

export default function styled(component: ComponentType | keyof ReactHTML | keyof ReactSVG) {
  return (strings: string[], ...values: Interpolation[]) => {
    return forwardRef(({ children, ...rest }, ref) => {
      return createElement(
        Component,
        {
          ...rest,
          __component: component,
          __propsToClassNamesMap: buildPropsToClassNamesMap(interweaveInterpolations(strings, values)),
          __ref: ref,
        },
        children,
      );
    });
  };
}
