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
import removeUnusedImports from "./helpers/remove-unused-imports";
import setIdentifierInExportsArgs from "./helpers/set-identifier-in-exports-args";
import { PluginResult } from "./types";

export default function transformStylingFiles(): PluginResult {
  return {
    visitor: {
      Program(babelPath, { filename }) {
        const { base } = pathParse(filename);
        if (!FILENAME_REGEX.test(base)) return;

        const importDeclarations = (babelPath
          .get("body")
          .filter(node => node.isImportDeclaration()) as unknown) as Array<NodePath<ImportDeclaration>>;

        const exportDeclarations = (babelPath
          .get("body")
          .filter(node => node.isExportNamedDeclaration()) as unknown) as Array<NodePath<ExportNamedDeclaration>>;

        setIdentifierInExportsArgs(exportDeclarations);

        const { identifiers, map } = getExportsArgs(exportDeclarations);
        const importDeclarationsToInclude: ImportDeclaration[] = [];

        importDeclarations.forEach(declaration => {
          if (getImportSource(declaration).startsWith("@styling")) return;

          const importNames = getImportNames(declaration.get("specifiers"));
          const usedImportNames = intersection(identifiers, importNames);
          if (!usedImportNames.length) return;

          if (importNames.length !== usedImportNames.length) {
            removeUnusedImports(declaration, usedImportNames);
          }

          importDeclarationsToInclude.push(declaration.node);
        });

        const namedExports = evalStylingFile(generator(babelPath.node).code, filename);
        const transformedFile = buildTransformedFile(namedExports, importDeclarationsToInclude, map);

        babelPath.replaceWith(program(transformedFile));
        babelPath.skip();
      },
    },
  };
}
