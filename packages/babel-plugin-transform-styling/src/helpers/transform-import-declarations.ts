import { NodePath } from "@babel/core";
import { ImportDeclaration, Program, Statement, cloneNode } from "@babel/types";
import { importSourceIsRelativePath, info } from "@styling/helpers";
import { intersection } from "lodash";
import { parse } from "path";
import buildImportTryCatchRequire from "./build-import-try-catch-require";
import getImportNames from "./get-import-names";
import getImportSource from "./get-import-source";
import removeUnusedImports from "./remove-unused-imports";
import setImportSourceAsAbsolutePath from "./set-import-source-as-absolute-path";

export default function transformImportDeclarations(
  programPath: NodePath<Program>,
  identifiers: string[],
  sourceFilename: string,
) {
  const { dir } = parse(sourceFilename);
  const importDeclarationPaths = programPath.get("body").filter(node => node.isImportDeclaration());
  const importDeclarationsToInclude: ImportDeclaration[] = [];
  info("Iterating import declarations");

  importDeclarationPaths.forEach((statementPath, index) => {
    info("Entering import declaration");
    const declarationPath = statementPath as NodePath<ImportDeclaration>;
    const importSource = getImportSource(declarationPath);

    if (!importSource.startsWith("@styling")) {
      if (importSourceIsRelativePath(importSource)) {
        setImportSourceAsAbsolutePath(declarationPath, importSource, dir);
      }

      info("Getting import names");
      const importNames = getImportNames(declarationPath.get("specifiers"));
      const usedImportNames = intersection(identifiers, importNames);

      if (usedImportNames.length) {
        let removedImportsClone: ImportDeclaration | undefined;
        const originalClone = cloneNode(declarationPath.node);

        if (importNames.length !== usedImportNames.length) {
          info("Removing unused imports");
          removeUnusedImports(declarationPath, usedImportNames);

          removedImportsClone = cloneNode(declarationPath.node);
          declarationPath.replaceWith(originalClone);
        }

        importDeclarationsToInclude.push(removedImportsClone || originalClone);
      }
    }

    const tryCatchRequire = buildImportTryCatchRequire(declarationPath, index);
    declarationPath.replaceWithMultiple(tryCatchRequire as Statement[]);
  });

  return importDeclarationsToInclude;
}
