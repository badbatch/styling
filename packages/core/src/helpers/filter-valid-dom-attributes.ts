import { PlainObject } from "@styling/types";
import htmlElementAttributes from "html-element-attributes";
import { isString } from "lodash";
import { ComponentType, ReactHTML, ReactSVG } from "react";
import svgElementAttributes from "svg-element-attributes";
import reactAttributesMap from "../data/react-attributes-map";

function getValidElementAttributes(component: keyof ReactHTML | keyof ReactSVG) {
  let validAttributes: string[] = [];

  if (component in htmlElementAttributes) {
    // @ts-ignore
    validAttributes = [...htmlElementAttributes["*"], ...htmlElementAttributes[component]];
  }

  if (component in svgElementAttributes) {
    // @ts-ignore
    validAttributes = [...validAttributes, ...svgElementAttributes["*"], ...svgElementAttributes[component]];
  }

  return validAttributes;
}

function isAriaAttribute(propName: string) {
  return propName.startsWith("aria-");
}

function isDataAttribute(propName: string) {
  return propName.startsWith("data-");
}

function isEventAttribute(propName: string) {
  return /^on[A-Z]/.test(propName);
}

export default function filterValidDOMAttributes(
  component: ComponentType | keyof ReactHTML | keyof ReactSVG,
  props: PlainObject,
) {
  if (!isString(component)) return props;

  return Object.keys(props).reduce((filtered: PlainObject, propName) => {
    if (isAriaAttribute(propName) || isDataAttribute(propName) || isEventAttribute(propName)) {
      filtered[propName] = props[propName];
    }

    const validAttributes = getValidElementAttributes(component);

    if (validAttributes.find(attr => attr.toLowerCase() === propName.toLowerCase())) {
      // @ts-ignore
      const reactPropName = reactAttributesMap[propName] || propName;
      filtered[reactPropName] = props[propName];
    }

    return filtered;
  }, {});
}
