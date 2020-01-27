import { PathConfig, PlainObject } from "@styling/types";
import { isObject } from "lodash";

export default function isPathConfig(val?: string | PathConfig | PlainObject) {
  return isObject(val) && "path" in val && "workingDir" in val;
}
