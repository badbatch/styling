import { PlainObject, StylingProps } from "@styling/types";
import { isArray, isBoolean, isString } from "lodash";
import { RelevantProps } from "../types";
import getMatchingStylingProp from "./get-matching-styling-prop";

export default function filterRelevantProps(stylingProps: StylingProps, props: PlainObject): RelevantProps {
  const filteredProps: PlainObject = {};

  Object.keys(props).forEach(key => {
    const stylingProp = getMatchingStylingProp(key, stylingProps);

    if (stylingProp) {
      switch (true) {
        case isBoolean(props[key]) && !!props[key] && isString(stylingProp):
        case isString(props[key]) &&
          isArray(stylingProp) &&
          isArray(stylingProp[1]) &&
          stylingProp[1].includes(props[key]):
          filteredProps[key] = props[key];
          break;
        // no default
      }
    }
  });

  return filteredProps;
}
