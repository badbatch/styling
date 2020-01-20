import { NodePath } from "@babel/core";
import generator from "@babel/generator";
import { parse as babelParse } from "@babel/parser";
import { ExportNamedDeclaration, ImportDeclaration, program } from "@babel/types";
import fileChanged from "@styling/file-change";
import { error, importSourceIsRelativePath, info, setLevel, verbose } from "@styling/helpers";
import { intersection } from "lodash";
import { parse as pathParse } from "path";
import { FILENAME_REGEX } from "./constants";
import buildTransformedFile from "./helpers/build-transformed-file";
import cacheTransformedFile from "./helpers/cache-transformed-file";
import evalStylingFile from "./helpers/eval-styling-file";
import getExportsComponentArgs from "./helpers/get-exports-component-args";
import getImportNames from "./helpers/get-import-names";
import getImportSource from "./helpers/get-import-source";
import getTransformedFileFromCache from "./helpers/get-transformed-file-from-cache";
import hasTransformedFileInCache from "./helpers/has-transformed-file-in-cache";
import removeUnusedImports from "./helpers/remove-unused-imports";
import setImportSourceAsAbsolutePath from "./helpers/set-import-source-as-absolute-path";
import setMetadataInExportsArgs from "./helpers/set-metadata-in-exports-args";
import { PluginResult, StylingPluginOptions } from "./types";

// tslint:disable-next-line no-any
export default function transformStylingFiles(babel: any, options: StylingPluginOptions = {}): PluginResult {
  setLevel(options.logLevel);
  info("Entering transformStylingFiles");

  return {
    visitor: {
      Program(babelPath, state) {
        const { filename } = state;
        const { base, dir } = pathParse(filename);
        if (!FILENAME_REGEX.test(base)) return;

        /**
         * TODO: Need to expand fileChanged to include theme.
         */
        if (!fileChanged(filename) && hasTransformedFileInCache(filename)) {
          info(`Retrieving cached transformed file ${filename}`);
          const cachedFile = getTransformedFileFromCache(filename);
          const file = babelParse(cachedFile, { sourceType: "module" });

          /**
           * TODO: Need to transform file to commonjs if that is specified
           * in babel plugins.
           */

          info("Replacing program");
          babelPath.replaceWith(file.program);
          babelPath.skip();
          return;
        }

        info(`Entering styling file ${filename}`);

        const importDeclarations = (babelPath
          .get("body")
          .filter(node => node.isImportDeclaration()) as unknown) as Array<NodePath<ImportDeclaration>>;

        const exportDeclarations = (babelPath
          .get("body")
          .filter(node => node.isExportNamedDeclaration()) as unknown) as Array<NodePath<ExportNamedDeclaration>>;

        info("Setting identifier in exports args");
        setMetadataInExportsArgs(exportDeclarations, filename);

        info("Getting exports args");
        const { identifiers, map } = getExportsComponentArgs(exportDeclarations);
        const importDeclarationsToInclude: ImportDeclaration[] = [];

        info("Iterating import declarations");

        importDeclarations.forEach(declaration => {
          info("Entering import declaration");
          const importSource = getImportSource(declaration);
          if (importSource.startsWith("@styling")) return;

          /**
           * TODO: Need to support path aliases such as "#/".
           */
          if (importSourceIsRelativePath(importSource)) {
            setImportSourceAsAbsolutePath(declaration, importSource, dir);
          }

          info("Getting import names");
          const importNames = getImportNames(declaration.get("specifiers"));
          const usedImportNames = intersection(identifiers, importNames);
          if (!usedImportNames.length) return;

          if (importNames.length !== usedImportNames.length) {
            info("Removing unused imports");
            removeUnusedImports(declaration, usedImportNames);
          }

          importDeclarationsToInclude.push(declaration.node);
        });

        info("Evaluating styling file");
        const namedExports = evalStylingFile(generator(babelPath.node).code, filename);

        if (!namedExports) {
          error("Invalid evalStylingFile output");
          return;
        }

        verbose("Transforming styling file with named exports\n", namedExports);
        const transformedProgram = program(buildTransformedFile(namedExports, importDeclarationsToInclude, map));
        cacheTransformedFile(filename, transformedProgram);

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
