import { NodePath } from "@babel/core";
import { ImportDeclaration } from "@babel/types";

export default function getImportSource(declaration: NodePath<ImportDeclaration>) {
  return declaration.node.source.value;
}
