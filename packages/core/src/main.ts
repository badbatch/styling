import { StringObject, StylingProps } from "@styling/types";
import { ComponentType, ReactHTML, ReactSVG, createElement, forwardRef } from "react";
import buildClassName from "./helpers/build-class-name";
import getClassNameFromProps from "./helpers/get-class-name-from-props";
import { ForwardedProps, ReturnedElementProps } from "./types";

export default function styling(
  component: ComponentType | keyof ReactHTML | keyof ReactSVG,
  stylingProps: StylingProps,
  propsToClassNamesMap: StringObject,
) {
  // tslint:disable-next-line no-any
  return forwardRef<any, ForwardedProps>(({ as, children, className, ...rest }, ref) => {
    const stylingClassName = getClassNameFromProps(stylingProps, propsToClassNamesMap, rest);

    return createElement<ReturnedElementProps>(
      as || component,
      {
        ...rest,
        className: buildClassName(stylingClassName, className),
        ref,
      },
      children,
    );
  });
}
