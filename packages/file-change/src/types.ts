import { PlainObject } from "@styling/types";

export interface CheckFileAndImportsOptions {
  lastCheckedFiles: PlainObject;
  parentLastCheckedTimestamp?: number;
}
