import { parse } from "@babel/parser";
import { info } from "@styling/helpers";
import getTransformedFileFromCache from "./get-transformed-file-from-cache";

export default function retrieveCachedFile(filename: string) {
  info(`Retrieving cached transformed file ${filename}`);
  const cachedFile = getTransformedFileFromCache(filename);
  return parse(cachedFile, { sourceType: "module" });
}
