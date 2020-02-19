import { NodePath } from "@babel/core";
import generator from "@babel/generator";
import { ExportNamedDeclaration, program } from "@babel/types";
import fileChanged from "@styling/file-change";
import { error, info, loadStylingConfig, setLevel, verbose } from "@styling/helpers";
import { parse } from "path";
import { FILENAME_REGEX } from "./constants";
import addCSSFileToImportDeclarations from "./helpers/add-css-file-to-import-declarations";
import buildTransformedFile from "./helpers/build-transformed-file";
import cacheTransformedFile from "./helpers/cache-transformed-file";
import checkAndAwaitActiveBuild from "./helpers/check-and-await-active-build";
import copyCachedCSS from "./helpers/copy-cached-css";
import evalStylingFile from "./helpers/eval-styling-file";
import getExportsComponentArgs from "./helpers/get-exports-component-args";
import hasTransformedFileInCache from "./helpers/has-transformed-file-in-cache";
import retrieveCachedFile from "./helpers/retrieve-cached-file";
import setMetadataInExportsArgs from "./helpers/set-metadata-in-exports-args";
import transformImportDeclarations from "./helpers/transform-import-declarations";
import updateActiveBuilds from "./helpers/update-active-builds";
import { PluginResult, StylingPluginOptions } from "./types";

export default function transformStylingFiles(
  babel: any, // tslint:disable-line no-any
  { logLevel, jsOutputPath }: StylingPluginOptions = {},
): PluginResult {
  setLevel(logLevel);
  info("Entering transformStylingFiles");

  return {
    visitor: {
      Program(babelPath, state) {
        const { filename } = state;
        const { base } = parse(filename);
        if (!FILENAME_REGEX.test(base)) return;

        const { cssOutputPath } = loadStylingConfig({ sourceFilename: filename });

        if (checkAndAwaitActiveBuild(filename) && hasTransformedFileInCache(filename)) {
          const file = retrieveCachedFile(filename);
          info("Replacing program");
          babelPath.replaceWith(file.program);
          babelPath.skip();
          return;
        }

        /**
         * TODO: Need to check if theme has changed or if styling
         * packages have been updated.
         */

        if (!fileChanged(filename) && hasTransformedFileInCache(filename)) {
          info(`Files have not changed and transformed file in cache for ${filename}`);
          const file = retrieveCachedFile(filename);

          info(`Writing cached css to ${cssOutputPath}`);
          copyCachedCSS(filename, cssOutputPath);
          updateActiveBuilds(filename);

          info("Replacing program");
          babelPath.replaceWith(file.program);
          babelPath.skip();
          return;
        }

        info(`Entering styling file ${filename}`);

        const exportDeclarations = (babelPath
          .get("body")
          .filter(node => node.isExportNamedDeclaration()) as unknown) as Array<NodePath<ExportNamedDeclaration>>;

        info("Setting identifier in exports args");
        setMetadataInExportsArgs(exportDeclarations, filename);

        info("Getting exports args");
        const { identifiers, map } = getExportsComponentArgs(exportDeclarations);
        const importDeclarationsToInclude = transformImportDeclarations(babelPath, identifiers, filename);

        info("Evaluating styling file");
        const namedExports = evalStylingFile(generator(babelPath.node).code, filename);

        if (!namedExports) {
          error("Invalid evalStylingFile output");
          return;
        }

        if (jsOutputPath) {
          addCSSFileToImportDeclarations(importDeclarationsToInclude, filename, cssOutputPath, jsOutputPath);
        }

        verbose("Transforming styling file with named exports\n", namedExports);
        const transformedProgram = program(buildTransformedFile(namedExports, importDeclarationsToInclude, map));
        cacheTransformedFile(filename, transformedProgram);
        updateActiveBuilds(filename);

        /**
         * TODO: Need to transform file to commonjs if that is specified
         * in babel plugins.
         */

        info("Replacing program");
        babelPath.replaceWith(transformedProgram);
        babelPath.skip();
      },
    },
  };
}
