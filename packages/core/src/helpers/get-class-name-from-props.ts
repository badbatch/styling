import { PlainObject, StringObject, StylingProps } from "@styling/types";
import filterRelevantProps from "./filter-relevant-props";

export default function getClassNameFromProps(
  stylingProps: StylingProps,
  propsToClassNamesMap: StringObject,
  props: PlainObject,
) {
  const filteredProps = filterRelevantProps(stylingProps, props);
  // TODO
}
