import { NodePath } from "@babel/core";
import generator from "@babel/generator";
import {
  ExportNamedDeclaration,
  ImportDeclaration,
  cloneNode,
  importDeclaration,
  program,
  stringLiteral,
} from "@babel/types";
import fileChanged from "@styling/file-change";
import {
  error,
  getFullOutputPath,
  getPathFromConfig,
  importSourceIsRelativePath,
  info,
  loadStylingConfig,
  setLevel,
  verbose,
} from "@styling/helpers";
import appRoot from "app-root-path";
import { intersection } from "lodash";
import { parse, relative } from "path";
import { CSS_FILE_EXT, FILENAME_REGEX } from "./constants";
import buildTransformedFile from "./helpers/build-transformed-file";
import cacheTransformedFile from "./helpers/cache-transformed-file";
import checkAndAwaitActiveBuild from "./helpers/check-and-await-active-build";
import copyCachedCSS from "./helpers/copy-cached-css";
import evalStylingFile from "./helpers/eval-styling-file";
import getExportsComponentArgs from "./helpers/get-exports-component-args";
import getImportNames from "./helpers/get-import-names";
import getImportSource from "./helpers/get-import-source";
import hasTransformedFileInCache from "./helpers/has-transformed-file-in-cache";
import removeUnusedImports from "./helpers/remove-unused-imports";
import retrieveCachedFile from "./helpers/retrieve-cached-file";
import setImportSourceAsAbsolutePath from "./helpers/set-import-source-as-absolute-path";
import setMetadataInExportsArgs from "./helpers/set-metadata-in-exports-args";
import updateActiveBuilds from "./helpers/update-active-builds";
import { PluginResult, StylingPluginOptions } from "./types";

// tslint:disable-next-line no-any
export default function transformStylingFiles(babel: any, options: StylingPluginOptions = {}): PluginResult {
  setLevel(options.logLevel);
  info("Entering transformStylingFiles");

  return {
    visitor: {
      Program(babelPath, state) {
        const { filename } = state;
        const { base, dir } = parse(filename);
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

          if (importSourceIsRelativePath(importSource)) {
            setImportSourceAsAbsolutePath(declaration, importSource, dir);
          }

          info("Getting import names");
          const importNames = getImportNames(declaration.get("specifiers"));
          const usedImportNames = intersection(identifiers, importNames);
          if (!usedImportNames.length) return;

          let removedImportsClone: ImportDeclaration | undefined;
          const originalClone = cloneNode(declaration.node);

          if (importNames.length !== usedImportNames.length) {
            info("Removing unused imports");
            removeUnusedImports(declaration, usedImportNames);

            removedImportsClone = cloneNode(declaration.node);
            declaration.replaceWith(originalClone);
          }

          importDeclarationsToInclude.push(removedImportsClone || originalClone);
        });

        info("Evaluating styling file");
        const namedExports = evalStylingFile(generator(babelPath.node).code, filename);

        if (!namedExports) {
          error("Invalid evalStylingFile output");
          return;
        }

        /**
         * TODO: Fix issue with wrong relative path css being generated
         * in CI pipeline causing build to fail.
         */

        if (options.jsOutputPath) {
          const fullJSFolderOutputPath = getFullOutputPath(
            getPathFromConfig(options.jsOutputPath, appRoot.toString(), dir, process.cwd()),
            dir,
            { exclude: "src" },
          );

          const fullCSSOutputPath = getFullOutputPath(cssOutputPath, filename, {
            exclude: "src",
            extension: CSS_FILE_EXT,
          });

          importDeclarationsToInclude.push(
            importDeclaration([], stringLiteral(relative(fullJSFolderOutputPath, fullCSSOutputPath))),
          );
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
