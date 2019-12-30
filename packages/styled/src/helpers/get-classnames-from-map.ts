import { PlainObject, StringObject } from "@styling/types";
import { CLASSNAME } from "../constants";

export default function getClassNamesFromMap(propsToClassNamesMap: StringObject, props: PlainObject) {
  return Object.keys(props)
    .reduce((classNames, key) => {
      if (key === CLASSNAME) {
        classNames.push(props[key]);
      } else if (propsToClassNamesMap[key]) {
        classNames.push(propsToClassNamesMap[key]);
      }

      return classNames;
    }, [] as string[])
    .join(" ");
}
