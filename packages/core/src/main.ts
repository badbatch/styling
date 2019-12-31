import { StringObject, StylingProps } from "@styling/types";
import { ComponentType, ReactHTML, ReactSVG, createElement, forwardRef } from "react";
import getClassNameFromProps from "./helpers/get-class-name-from-props";

export default function styling(
  component: ComponentType | keyof ReactHTML | keyof ReactSVG,
  stylingProps: StylingProps,
  propsToClassNamesMap: StringObject,
) {
  return forwardRef(({ children, className, ...rest }, ref) => {
    const stylingClassName = getClassNameFromProps(stylingProps, propsToClassNamesMap, rest);

    return createElement(
      component,
      {
        ...rest,
        className: buildClassName(stylingClassName, className),
        ref,
      },
      children,
    );
  });
}
