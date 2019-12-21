import { NodePath } from "@babel/core";
import { ImportDeclaration } from "@babel/types";

export default function removeUnusedImports(declaration: NodePath<ImportDeclaration>, usedImportNames: string[]) {
  const specifiers = declaration.get("specifiers");

  specifiers.forEach(specifier => {
    if (!usedImportNames.includes(specifier.get("local").node.name)) {
      specifier.remove();
    }
  });
}
