import { PlainObject, StringObject, StylingProps } from "@styling/types";
import buildMapKeyFromProps from "./build-map-key-from-props";
import filterRelevantProps from "./filter-relevant-props";

export default function getClassNameFromProps(
  stylingProps: StylingProps,
  propsToClassNamesMap: StringObject,
  props: PlainObject,
) {
  const filteredProps = filterRelevantProps(stylingProps, props);
  const mapKey = buildMapKeyFromProps(filteredProps);
  return propsToClassNamesMap[mapKey];
}
