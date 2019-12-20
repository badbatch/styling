import { parse as babelParse } from "@babel/parser";
import { parse as pathParse } from "path";
import { FILENAME_REGEX } from "./constants";
import buildTransformedFile from "./helpers/build-transformed-file";
import loadStylingFile from "./helpers/load-styling-file";
import { PluginResult } from "./types";

export default function transformStylingFiles(): PluginResult {
  return {
    visitor: {
      Program(babelPath, { filename }) {
        const { base } = pathParse(filename);
        if (!FILENAME_REGEX.test(base)) return;

        const namedExports = loadStylingFile(filename);
        const transformedFile = buildTransformedFile(namedExports);
        const newProgram = babelParse(transformedFile, { sourceType: "module" }).program;
        babelPath.replaceWith(newProgram);
        babelPath.skip();
      },
    },
  };
}
