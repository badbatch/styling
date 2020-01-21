import { info } from "@styling/helpers";
import { PropList, StringObject } from "@styling/types";
import { isFunction, isObject, kebabCase } from "lodash";
import { ComponentType, ReactHTML, ReactSVG, createElement, forwardRef } from "react";
import buildClassName from "./helpers/build-class-name";
import filterValidDOMAttributes from "./helpers/filter-valid-dom-attributes";
import getClassNamesFromProps from "./helpers/get-class-names-from-props";
import getCSSVariablePropList from "./helpers/get-css-variable-prop-list";
import { ForwardedProps, ReturnedElementProps } from "./types";

export default function styling(
  component: ComponentType | keyof ReactHTML | keyof ReactSVG,
  propList: PropList,
  relevantPropKeys: string[],
  propsToClassNamesMap: StringObject,
) {
  info(`styling executed for ${component} with propList\n`, propList);

  // tslint:disable-next-line no-any
  return forwardRef<any, ForwardedProps>(({ as, children, className, ...rest }, ref) => {
    info(`class name passed into ${component}: ${className}`);

    const stylingClassNames = getClassNamesFromProps(propList, relevantPropKeys, propsToClassNamesMap, rest);
    const cssVariablePropList = getCSSVariablePropList(propList, rest);

    info(`styling class names generated for ${component}: ${stylingClassNames}`);

    /**
     * TODO: Components wrapped in other components are not
     * passing their class names down correctly in the wild.
     */

    return createElement<ReturnedElementProps>(
      as || component,
      {
        ...filterValidDOMAttributes(as || component, rest),
        className: buildClassName(stylingClassNames, className),
        ref: element => {
          if (element) {
            Object.keys(cssVariablePropList).forEach(propName => {
              element.style.setProperty(`--${kebabCase(propName)}`, cssVariablePropList[propName]);
            });

            if (isFunction(ref)) {
              ref(element);
            } else if (isObject(ref) && "current" in ref) {
              // @ts-ignore
              ref.current = element;
            }
          }
        },
      },
      children,
    );
  });
}
