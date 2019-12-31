/* tslint:disable no-console */

import { ERROR, INFO, WARN } from "../constants";

export function error(message: string, ...optionalParams: any[]) {
  if (getLevel() < 1) return;
  console.error(message, ...optionalParams);
}

export function warn(message: string, ...optionalParams: any[]) {
  if (getLevel() < 2) return;
  console.warn(message, ...optionalParams);
}

export function info(message: string, ...optionalParams: any[]) {
  if (getLevel() < 3) return;
  console.log(message, ...optionalParams);
}

export function getLevel() {
  switch (process.env.STYLING_LOG_LEVEL) {
    case ERROR:
      return 1;
    case WARN:
      return 2;
    case INFO:
      return 3;
    default:
      return 0;
  }
}

export function setLevel(logLevel?: "error" | "warn" | "info") {
  if (logLevel) process.env.STYLING_LOG_LEVEL = logLevel;
}
