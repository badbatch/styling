import { info } from "@styling/helpers";
import { PropList, StringObject } from "@styling/types";
import { isFunction, isObject, kebabCase } from "lodash";
import { createElement, forwardRef } from "react";
import { STYLING_DATA_ATTR } from "./constants";
import buildClassName from "./helpers/build-class-name";
import filterValidDOMAttributes from "./helpers/filter-valid-dom-attributes";
import getClassNamesFromProps from "./helpers/get-class-names-from-props";
import getCSSVariablePropList from "./helpers/get-css-variable-prop-list";
import getInheritedClassNamesAndTag from "./helpers/get-inherited-class-names-and-tag";
import { ForwardedProps, ReturnedElementProps, StylingComponent, StylingComponentOrTagType } from "./types";

export default function styling(
  component: StylingComponentOrTagType<{}>,
  propList: PropList,
  relevantPropKeys: string[],
  propsToClassNamesMap: StringObject,
) {
  info(`styling executed for ${component} with propList\n`, propList);

  // tslint:disable-next-line no-any
  const Styling = forwardRef<any, ForwardedProps>(({ as, children, className, ...rest }, ref) => {
    info(`class name passed into ${component}: ${className}`);

    const { inheritedStylingClassNames, inheritedTag } = getInheritedClassNamesAndTag(component, rest, ref);
    const componentOrTagName = as || inheritedTag || component;

    if (inheritedStylingClassNames) {
      info(`class name passed inherited from ${component}: ${inheritedStylingClassNames}`);
    }

    const stylingClassNames = getClassNamesFromProps(propList, relevantPropKeys, propsToClassNamesMap, rest);
    const cssVariablePropList = getCSSVariablePropList(propList, rest);

    info(`styling class names generated for ${component}: ${stylingClassNames}`);

    return createElement<ReturnedElementProps>(
      componentOrTagName,
      {
        ...filterValidDOMAttributes(componentOrTagName, rest),
        className: buildClassName(inheritedStylingClassNames, stylingClassNames, className),
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
        [STYLING_DATA_ATTR]: stylingClassNames,
      },
      children,
    );
  }) as StylingComponent<ForwardedProps>;

  Styling.isStyling = true;
  Styling.component = component;
  return Styling;
}
