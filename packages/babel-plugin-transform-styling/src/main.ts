import { NodePath } from "@babel/core";
import generator from "@babel/generator";
import { ExportNamedDeclaration, ImportDeclaration, program } from "@babel/types";
import { intersection } from "lodash";
import { parse as pathParse } from "path";
import { FILENAME_REGEX } from "./constants";
import buildTransformedFile from "./helpers/build-transformed-file";
import evalStylingFile from "./helpers/eval-styling-file";
import getExportsArgs from "./helpers/get-exports-args";
import getImportNames from "./helpers/get-import-names";
import getImportSource from "./helpers/get-import-source";
import { error, info, setLevel } from "./helpers/log";
import removeUnusedImports from "./helpers/remove-unused-imports";
import setIdentifierInExportsArgs from "./helpers/set-identifier-in-exports-args";
import { PluginResult, StylingPluginOptions } from "./types";

// tslint:disable-next-line no-any
export default function transformStylingFiles(babel: any, options: StylingPluginOptions = {}): PluginResult {
  setLevel(options.logLevel);
  info("Entering transformStylingFiles");

  return {
    visitor: {
      Program(babelPath, { filename }) {
        const { base } = pathParse(filename);
        if (!FILENAME_REGEX.test(base)) return;

        info(`Entering styling file ${filename}`);

        const importDeclarations = (babelPath
          .get("body")
          .filter(node => node.isImportDeclaration()) as unknown) as Array<NodePath<ImportDeclaration>>;

        const exportDeclarations = (babelPath
          .get("body")
          .filter(node => node.isExportNamedDeclaration()) as unknown) as Array<NodePath<ExportNamedDeclaration>>;

        info(`Setting identifier in exports args`);
        setIdentifierInExportsArgs(exportDeclarations);

        info(`Getting exports args`);
        const { identifiers, map } = getExportsArgs(exportDeclarations);
        const importDeclarationsToInclude: ImportDeclaration[] = [];

        info(`Iterating import declarations`);

        importDeclarations.forEach(declaration => {
          info(`Entering import declaration`);
          if (getImportSource(declaration).startsWith("@styling")) return;

          info(`Getting import names`);
          const importNames = getImportNames(declaration.get("specifiers"));
          const usedImportNames = intersection(identifiers, importNames);
          if (!usedImportNames.length) return;

          if (importNames.length !== usedImportNames.length) {
            info(`Removing unused imports`);
            removeUnusedImports(declaration, usedImportNames);
          }

          importDeclarationsToInclude.push(declaration.node);
        });

        info(`Evaluating styling file`);
        const namedExports = evalStylingFile(generator(babelPath.node).code, filename);

        if (!namedExports) {
          error(`Invalid evalStylingFile output`);
          return;
        }

        info(`Transforming styling file`);
        const transformedFile = buildTransformedFile(namedExports, importDeclarationsToInclude, map);

        info(`Replacing program`);
        babelPath.replaceWith(program(transformedFile));
        babelPath.skip();
      },
    },
  };
}
