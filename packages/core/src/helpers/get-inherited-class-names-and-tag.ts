import { PlainObject } from "@styling/types";
import { isString } from "lodash";
import { ReactHTML, ReactSVG } from "react";
import { STYLING_DATA_ATTR } from "../constants";
import { StylingComponent, StylingComponentOrTagType } from "../types";
import isStylingComponent from "./is-styling-component";

export default function getInheritedClassNamesAndTag(
  component: StylingComponentOrTagType<{}> | undefined,
  rest: PlainObject,
  ref: React.Ref<any>, // tslint:disable-line no-any
  { inheritedStylingClassNames = "" } = {},
): { inheritedStylingClassNames: string; inheritedTag?: keyof ReactHTML | keyof ReactSVG } {
  if (component && isStylingComponent(component)) {
    const stylingComponent = component as StylingComponent<{}>;
    const element = stylingComponent.render(rest, ref);

    if (element?.props?.[STYLING_DATA_ATTR]) {
      if (inheritedStylingClassNames) {
        inheritedStylingClassNames += " ";
      }

      inheritedStylingClassNames += element.props[STYLING_DATA_ATTR];
    }

    if (isString(stylingComponent.component)) {
      return { inheritedStylingClassNames, inheritedTag: stylingComponent.component };
    }

    return getInheritedClassNamesAndTag(stylingComponent.component, rest, ref, { inheritedStylingClassNames });
  }

  return { inheritedStylingClassNames };
}
