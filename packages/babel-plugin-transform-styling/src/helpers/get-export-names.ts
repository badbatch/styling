import { NodePath } from "@babel/core";
import { ExportDefaultSpecifier, ExportNamespaceSpecifier, ExportSpecifier } from "@babel/types";

export default function getExportNames(
  specifiers: NodePath<ExportSpecifier | ExportDefaultSpecifier | ExportNamespaceSpecifier>[],
) {
  return specifiers.map(specifier => specifier.get("exported").node.name);
}
