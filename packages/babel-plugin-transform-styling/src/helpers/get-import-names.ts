import { NodePath } from "@babel/core";
import { ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier } from "@babel/types";

export default function getImportNames(
  specifiers: NodePath<ImportDefaultSpecifier | ImportNamespaceSpecifier | ImportSpecifier>[],
) {
  return specifiers.map(specifier => specifier.get("local").node.name);
}
