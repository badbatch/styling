import { get, isObject } from "lodash";
import { ForwardRef } from "react-is";
import { StylingComponentOrTagType } from "../types";

// tslint:disable-next-line no-any
export default function isStylingComponent(val: StylingComponentOrTagType<{}>) {
  return isObject(val) && get(val, ["$$typeof"]) === ForwardRef && "isStyling" in val;
}
