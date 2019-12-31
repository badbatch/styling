import { PlainObject, StylingProps } from "@styling/types";
import isPropAStylingProp from "./is-prop-a-styling-prop";

export default function filterRelevantProps(stylingProps: StylingProps, props: PlainObject) {
  const filteredProps: PlainObject = {};

  Object.keys(props).forEach(key => {
    if (isPropAStylingProp(key, stylingProps)) {
    }
  });

  return filteredProps;
}
