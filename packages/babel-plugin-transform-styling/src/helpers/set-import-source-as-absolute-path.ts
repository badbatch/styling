import { NodePath } from "@babel/core";
import { ImportDeclaration, stringLiteral } from "@babel/types";
import { resolve } from "path";

export default function setImportSourceAsAbsolutePath(
  importDeclaration: NodePath<ImportDeclaration>,
  importSource: string,
  sourceDir: string,
) {
  const absolutePath = resolve(sourceDir, importSource);
  importDeclaration.get("source").replaceWith(stringLiteral(absolutePath));
}
